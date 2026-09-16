import { PDFDocument, PDFPage, PDFFont, PDFString, StandardFonts, rgb } from 'pdf-lib';
import { AssessmentScores, normalizeProfileShares, PROFILE_DISPLAY_ORDER, profiles } from './assessment';
import { DEBRIEF_BOOKING_URL } from './product';

const W = 612, H = 792, M = 52, CW = W - M * 2;
const rose = rgb(196/255,104/255,122/255), navy = rgb(24/255,44/255,64/255);
const blush = rgb(253/255,240/255,243/255), paper = rgb(253/255,249/255,250/255);
const ink = rgb(28/255,25/255,37/255), muted = rgb(105/255,87/255,98/255);
const rule = rgb(231/255,215/255,220/255), white = rgb(1,1,1);

type Input = { firstName: string; completedAt: string; scores: AssessmentScores; logoBytes?: Uint8Array };
type Opts = { x:number; y:number; width:number; size?:number; lineHeight?:number; color?:ReturnType<typeof rgb> };
type Fonts = { heading:PDFFont; headingBold:PDFFont; body:PDFFont; bodyBold:PDFFont };

function wrap(text:string,font:PDFFont,size:number,width:number){
  const lines:string[]=[]; let line='';
  for(const word of text.replace(/\s+/g,' ').trim().split(' ')){
    const next=line?`${line} ${word}`:word;
    if(font.widthOfTextAtSize(next,size)<=width) line=next;
    else { if(line) lines.push(line); line=word; }
  }
  if(line) lines.push(line); return lines;
}
function para(page:PDFPage,text:string,font:PDFFont,o:Opts){
  const size=o.size??12,lh=o.lineHeight??17,lines=wrap(text,font,size,o.width);
  lines.forEach((line,i)=>page.drawText(line,{x:o.x,y:o.y-i*lh,size,font,color:o.color??ink}));
  return o.y-lines.length*lh;
}
function centered(page:PDFPage,text:string,font:PDFFont,size:number,y:number,color:ReturnType<typeof rgb>){
  page.drawText(text,{x:(W-font.widthOfTextAtSize(text,size))/2,y,size,font,color});
}
function right(page:PDFPage,text:string,font:PDFFont,size:number,x:number,y:number,color:ReturnType<typeof rgb>){
  page.drawText(text,{x:x-font.widthOfTextAtSize(text,size),y,size,font,color});
}
function addLink(page:PDFPage,url:string,x:number,y:number,width:number,height:number){
  const annotation=page.doc.context.register(page.doc.context.obj({
    Type:'Annot',
    Subtype:'Link',
    Rect:[x,y,x+width,y+height],
    Border:[0,0,0],
    A:{Type:'Action',S:'URI',URI:PDFString.of(url)},
  }));
  page.node.addAnnot(annotation);
}
export async function createAttachmentReport({firstName,completedAt,scores,logoBytes}:Input){
  const pdf=await PDFDocument.create();
  pdf.setTitle(`${firstName}'s Personalized Attachment Profile`); pdf.setAuthor('Bev Mitelman, M.A. - Securely Loved');
  pdf.setSubject('Personalized Attachment Profile'); pdf.setCreator('Securely Loved');
  const f:Fonts={heading:await pdf.embedFont(StandardFonts.TimesRoman),headingBold:await pdf.embedFont(StandardFonts.TimesRomanBold),body:await pdf.embedFont(StandardFonts.Helvetica),bodyBold:await pdf.embedFont(StandardFonts.HelveticaBold)};
  const logo=logoBytes?await pdf.embedPng(logoBytes):undefined;
  const profile=profiles[scores.primary];

  const addPage=(title:string,kicker:string)=>{
    const page=pdf.addPage([W,H]); page.drawRectangle({x:0,y:0,width:W,height:H,color:paper});
    page.drawRectangle({x:0,y:H-14,width:W,height:14,color:rose});
    if(logo) page.drawImage(logo,{x:M,y:704,width:54,height:54});
    page.drawLine({start:{x:M,y:686},end:{x:W-M,y:686},thickness:.7,color:rule});
    page.drawText(kicker.toUpperCase(),{x:M,y:657,size:8,font:f.bodyBold,color:rose});
    wrap(title,f.headingBold,25,CW).forEach((line,i)=>page.drawText(line,{x:M,y:619-i*29,size:25,font:f.headingBold,color:ink}));
    return page;
  };
  const callout=(page:PDFPage,title:string,text:string,y:number,height:number,fill=blush)=>{
    page.drawRectangle({x:M,y,width:CW,height,color:fill,borderColor:rule,borderWidth:.8});
    page.drawText(title,{x:M+20,y:y+height-31,size:14,font:f.headingBold,color:rose});
    para(page,text,f.body,{x:M+20,y:y+height-58,width:CW-40,size:12,lineHeight:17,color:muted});
  };
  const list=(page:PDFPage,items:string[],x:number,y:number,width:number,size=12,lh=17,max=99)=>{
    let cy=y;
    for(const item of items.slice(0,max)){
      const baseline=cy;
      page.drawCircle({x:x+4,y:baseline+4,size:2.5,color:rose});
      cy=para(page,item,f.body,{x:x+17,y:baseline,width:width-17,size,lineHeight:lh,color:muted})-7;
    }
    return cy;
  };
  const splitList=(page:PDFPage,title:string|undefined,items:string[],y:number,height:number,columns=2,size=12,lh=17)=>{
    page.drawRectangle({x:M,y,width:CW,height,color:white,borderColor:rule,borderWidth:.7});
    const listY=title?y+height-76:y+height-36;
    if(title) page.drawText(title,{x:M+20,y:y+height-31,size:13.5,font:f.headingBold,color:navy});
    if(columns===1){
      list(page,items,M+20,listY,CW-40,size,lh);
      return;
    }
    const gap=28,width=(CW-40-gap)/2,mid=Math.ceil(items.length/2);
    list(page,items.slice(0,mid),M+20,listY,width,size,lh);
    list(page,items.slice(mid),M+20+width+gap,listY,width,size,lh);
  };
  const categoryPage=(title:string,kicker:string,items:string[],intro?:string)=>{
    const page=addPage(title,kicker);
    let cardTop=570;
    if(intro){
      const bottom=para(page,intro,f.bodyBold,{x:M,y:570,width:CW,size:12,lineHeight:17,color:muted});
      cardTop=bottom-24;
    }
    splitList(page,undefined,items,82,cardTop-82,items.length>10?2:1,12,17);
  };

  // Cover - retained from the approved design.
  {
    const page=pdf.addPage([W,H]); page.drawRectangle({x:0,y:0,width:W,height:H,color:blush});
    page.drawRectangle({x:30,y:30,width:W-60,height:H-60,borderColor:white,borderWidth:2});
    if(logo) page.drawImage(logo,{x:241,y:622,width:130,height:130});
    centered(page,'P E R S O N A L I Z E D',f.bodyBold,8.5,590,rose); centered(page,'Attachment Profile',f.headingBold,37,534,ink);
    centered(page,`Prepared for ${firstName}`,f.heading,16,492,muted); page.drawLine({start:{x:206,y:462},end:{x:406,y:462},thickness:1,color:rose});
    centered(page,profile.name,f.headingBold,22,397,navy);
    page.drawRectangle({x:76,y:164,width:460,height:104,color:white,borderColor:rule,borderWidth:.7});
    page.drawText('ABOUT THIS PROFILE',{x:94,y:239,size:8,font:f.bodyBold,color:rose});
    para(page,'This is an educational self-reflection tool, not a clinical assessment, diagnosis, or substitute for mental health care. Attachment patterns can vary across relationships and change over time. Use what resonates as a starting point for awareness and choice.',f.body,{x:94,y:217,width:424,size:8.8,lineHeight:13,color:muted});
    centered(page,'Your patterns were learned - and they can change.',f.body,11,123,muted);
    const date=new Date(completedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
    centered(page,`Created by Bev Mitelman, M.A.  |  ${date}`,f.body,8.5,70,muted);
  }

  // Foreword adapted directly to the individual.
  {
    const page=addPage('Understanding your result','Introduction');
    para(page,profile.introduction,f.body,{x:M,y:570,width:CW,color:muted});
    callout(page,'What this report is designed to do','Raise awareness of your core wounds, beliefs, emotional patterns, communication style, and coping mechanisms; deepen your understanding of your own patterns; and help you understand others with the intent of moving toward harmony, compassion, and deeper connection.',174,140);
    para(page,'Becoming securely attached can improve every relationship in your life, including the one you have with yourself. This report is designed to bring reflection and clarity to the answers you are seeking.',f.heading,{x:M,y:132,width:CW,size:13,lineHeight:19,color:navy});
  }

  // One primary winner; four style shares total exactly 100%.
  {
    const page=addPage('Your primary attachment style','Section 1 - Your results');
    const shares=normalizeProfileShares(scores);
    page.drawText(profile.name,{x:M,y:568,size:18,font:f.headingBold,color:navy});
    const essenceBottom=para(page,profile.essence,f.body,{x:M,y:538,width:CW,size:12,lineHeight:17,color:muted});
    let y=Math.min(486,essenceBottom-24);
    for(const key of PROFILE_DISPLAY_ORDER){
      const value=shares[key],color=key===scores.primary?rose:ink;
      page.drawText(profiles[key].name,{x:M,y,size:11,font:f.bodyBold,color:ink}); right(page,`${value}%`,f.bodyBold,11,W-M,y,color);
      page.drawRectangle({x:M,y:y-18,width:CW,height:10,color:rgb(.94,.91,.92)}); page.drawRectangle({x:M,y:y-18,width:CW*value/100,height:10,color}); y-=51;
    }
    page.drawText('TOTAL: 100%',{x:M,y:y+5,size:9,font:f.bodyBold,color:rose});
    callout(page,'Your primary result',`Your highest-scoring style is ${profile.name}. This report focuses only on this primary result so you can explore its common patterns in depth. You may find some or all of the material relevant to you.`,92,118,white);
  }

  // About yourself.
  categoryPage('Personality characteristics','Section 2 - About yourself',profile.characteristics,'These are the common patterns seen most frequently related to your attachment style. You may find some or all are relevant to you.');
  {
    const page=addPage('Core wounds','Section 2 - About yourself');
    callout(page,'Primary core wound',profile.primaryCoreWound,466,104);
    splitList(page,'OTHER CORE WOUNDS OFTEN PRESENT',profile.otherCoreWounds,82,354,profile.otherCoreWounds.length>10?2:1);
  }
  categoryPage('Emotional patterns','Section 2 - About yourself',profile.emotionalPatterns);
  categoryPage('Fears','Section 2 - About yourself',profile.fears);
  categoryPage('Personality needs','Section 2 - About yourself',profile.personalityNeeds);

  // Relationships.
  categoryPage('Needs in relationships','Section 3 - Your relationships',profile.relationshipNeeds,'These are the common relationship and coping behavioral patterns seen most frequently related to your attachment style. You may find some or all are relevant to you.');
  categoryPage('How conflict is handled','Section 3 - Your relationships',profile.conflictPatterns);
  categoryPage('Relationship to boundaries','Section 3 - Your relationships',profile.boundaries);
  categoryPage('Communication strategies','Section 3 - Your relationships',profile.communicationStrategies);
  categoryPage('Behavioral coping mechanisms','Section 3 - Your relationships',profile.copingMechanisms);
  categoryPage('Common expectations','Section 3 - Your relationships',profile.expectations);

  // Simple debrief CTA.
  {
    const page=addPage('Your next step','Personalized support');
    para(page,'You now have a clear, personalized view of the patterns most often connected with your primary attachment style.',f.heading,{x:M,y:565,width:CW,size:15,lineHeight:21,color:navy});
    callout(page,'Understand how this applies to your life',`A personalized results debrief or counselling session with Bev can help you understand where your ${profile.name} patterns appear in your relationships, which parts of this report are most relevant, and what your result means in the context of your own experiences.`,338,158);
    para(page,'You understand the pattern. If you want help understanding how it specifically shows up for you, let’s look at it together.',f.headingBold,{x:M,y:286,width:CW,size:17,lineHeight:23,color:ink});
    page.drawRectangle({x:142,y:182,width:328,height:52,color:rose});
    centered(page,'BOOK A PERSONALIZED RESULTS DEBRIEF',f.bodyBold,10.5,202,white);
    addLink(page,DEBRIEF_BOOKING_URL,142,182,328,52);
  }

  const total=pdf.getPageCount();
  pdf.getPages().forEach((page,i)=>{
    if(i===0)return;
    page.drawLine({start:{x:M,y:48},end:{x:W-M,y:48},thickness:.5,color:rule});
    page.drawText('SECURELY LOVED  |  Personalized Attachment Profile',{x:M,y:30,size:7.1,font:f.body,color:muted});
    centered(page,'This information has been adapted from the Personal Development School.',f.body,6.6,17,muted);
    right(page,`${i+1} / ${total}`,f.body,7.1,W-M,30,muted);
  });
  return pdf.save();
}
