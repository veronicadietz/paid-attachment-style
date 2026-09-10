import { PDFDocument, PDFPage, PDFFont, StandardFonts, rgb } from 'pdf-lib';
import { AssessmentScores, ProfileKey, profiles } from './assessment';

const W = 612, H = 792, M = 52, CW = W - M * 2, TOP = 574;
const rose = rgb(196/255,104/255,122/255), navy = rgb(24/255,44/255,64/255);
const blush = rgb(253/255,240/255,243/255), paper = rgb(253/255,249/255,250/255);
const ink = rgb(28/255,25/255,37/255), muted = rgb(105/255,87/255,98/255);
const rule = rgb(231/255,215/255,220/255), sage = rgb(112/255,148/255,128/255), white = rgb(1,1,1);

type Input = { firstName: string; completedAt: string; scores: AssessmentScores; logoBytes?: Uint8Array };
type Opts = { x:number; y:number; width:number; size?:number; lineHeight?:number; color?:ReturnType<typeof rgb> };

function wrap(text:string, font:PDFFont, size:number, width:number) {
  const lines:string[]=[]; let line='';
  for (const word of text.replace(/\s+/g,' ').trim().split(' ')) {
    const next=line?`${line} ${word}`:word;
    if (font.widthOfTextAtSize(next,size)<=width) line=next;
    else { if(line) lines.push(line); line=word; }
  }
  if(line) lines.push(line); return lines;
}
function para(page:PDFPage,text:string,font:PDFFont,o:Opts) {
  const size=o.size??10.2, lh=o.lineHeight??15, lines=wrap(text,font,size,o.width);
  lines.forEach((line,i)=>page.drawText(line,{x:o.x,y:o.y-i*lh,size,font,color:o.color??ink}));
  return o.y-lines.length*lh;
}
function centered(page:PDFPage,text:string,font:PDFFont,size:number,y:number,color:ReturnType<typeof rgb>) {
  page.drawText(text,{x:(W-font.widthOfTextAtSize(text,size))/2,y,size,font,color});
}
function right(page:PDFPage,text:string,font:PDFFont,size:number,x:number,y:number,color:ReturnType<typeof rgb>) {
  page.drawText(text,{x:x-font.widthOfTextAtSize(text,size),y,size,font,color});
}

export async function createAttachmentReport({firstName,completedAt,scores,logoBytes}:Input) {
  const pdf=await PDFDocument.create();
  pdf.setTitle(`${firstName}'s Personalized Attachment Profile`); pdf.setAuthor('Bev Mitelman, M.A. - Securely Loved');
  pdf.setSubject('Personalized Attachment Profile'); pdf.setCreator('Securely Loved');
  const heading=await pdf.embedFont(StandardFonts.TimesRoman), headingBold=await pdf.embedFont(StandardFonts.TimesRomanBold);
  const body=await pdf.embedFont(StandardFonts.Helvetica), bodyBold=await pdf.embedFont(StandardFonts.HelveticaBold);
  const logo=logoBytes?await pdf.embedPng(logoBytes):undefined;
  const primary=profiles[scores.primary], secondary=profiles[scores.secondary];
  const addPage=(title:string,kicker:string)=>{
    const page=pdf.addPage([W,H]); page.drawRectangle({x:0,y:0,width:W,height:H,color:paper});
    page.drawRectangle({x:0,y:H-14,width:W,height:14,color:rose});
    if(logo) page.drawImage(logo,{x:M,y:704,width:54,height:54});
    page.drawLine({start:{x:M,y:686},end:{x:W-M,y:686},thickness:.7,color:rule});
    page.drawText(kicker.toUpperCase(),{x:M,y:657,size:8,font:bodyBold,color:rose});
    wrap(title,headingBold,25,CW).forEach((line,i)=>page.drawText(line,{x:M,y:619-i*29,size:25,font:headingBold,color:ink}));
    return page;
  };
  const callout=(page:PDFPage,title:string,text:string,y:number,height:number,fill=blush)=>{
    page.drawRectangle({x:M,y,width:CW,height,color:fill,borderColor:rule,borderWidth:.7});
    page.drawText(title,{x:M+18,y:y+height-28,size:12.5,font:headingBold,color:rose});
    para(page,text,body,{x:M+18,y:y+height-50,width:CW-36,size:9.2,lineHeight:13.3,color:muted});
  };
  const list=(page:PDFPage,items:string[],x:number,y:number,width:number,max=5)=>{
    let cy=y; for(const item of items.slice(0,max)) { page.drawCircle({x:x+3,y:cy+2,size:2.2,color:rose});
      cy=para(page,item,body,{x:x+14,y:cy+6,width:width-14,size:9,lineHeight:13,color:muted})-5; }
  };
  const card=(page:PDFPage,x:number,y:number,width:number,height:number,title:string,items:string[],max=5)=>{
    page.drawRectangle({x,y,width,height,color:white,borderColor:rule,borderWidth:.7});
    para(page,title,headingBold,{x:x+16,y:y+height-28,width:width-32,size:12,lineHeight:14,color:navy});
    list(page,items,x+16,y+height-64,width-32,max);
  };
  const two=(page:PDFPage,y:number,height:number,lt:string,li:string[],rt:string,ri:string[],max=5)=>{
    const gap=20,width=(CW-gap)/2; card(page,M,y,width,height,lt,li,max); card(page,M+width+gap,y,width,height,rt,ri,max);
  };

  // Cover: disclaimer is deliberately upfront.
  {
    const page=pdf.addPage([W,H]); page.drawRectangle({x:0,y:0,width:W,height:H,color:blush});
    page.drawRectangle({x:30,y:30,width:W-60,height:H-60,borderColor:white,borderWidth:2});
    if(logo) page.drawImage(logo,{x:241,y:622,width:130,height:130});
    centered(page,'P E R S O N A L I Z E D',bodyBold,8.5,590,rose); centered(page,'Attachment Profile',headingBold,37,534,ink);
    centered(page,`Prepared for ${firstName}`,heading,16,492,muted); page.drawLine({start:{x:206,y:462},end:{x:406,y:462},thickness:1,color:rose});
    const label=scores.isBlend?`${primary.name} + ${secondary.name}`:primary.name;
    wrap(label,headingBold,20,460).forEach((line,i)=>centered(page,line,headingBold,20,403-i*26,navy));
    page.drawRectangle({x:76,y:164,width:460,height:104,color:white,borderColor:rule,borderWidth:.7});
    page.drawText('ABOUT THIS PROFILE',{x:94,y:239,size:8,font:bodyBold,color:rose});
    para(page,'This is an educational self-reflection tool, not a clinical assessment, diagnosis, or substitute for mental health care. Attachment patterns can vary across relationships and change over time. Use what resonates as a starting point for awareness and choice.',body,{x:94,y:217,width:424,size:8.8,lineHeight:13,color:muted});
    centered(page,'Your patterns were learned - and they can change.',body,11,123,muted);
    const date=new Date(completedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
    centered(page,`Created by Bev Mitelman, M.A.  |  ${date}`,body,8.5,70,muted);
  }

  // Results with all four standardized style names.
  {
    const page=addPage('Your attachment profile','Your results');
    const intro=scores.isBlend?`Your results show a blended profile. ${primary.name} is your primary pattern, while ${secondary.name} is close enough to meaningfully shape how you experience intimacy, uncertainty, and conflict.`:`Your responses align most strongly with ${primary.name}. The other patterns still matter because attachment is dimensional and may shift across relationships or stress levels.`;
    para(page,intro,body,{x:M,y:TOP-4,width:CW,size:10.4,lineHeight:16,color:muted}); let y=500;
    for(const key of scores.ranked){const value=scores.alignments[key],color=key===scores.primary?rose:key===scores.secondary?navy:sage;
      page.drawText(profiles[key].name,{x:M,y,size:9.5,font:bodyBold,color:ink}); right(page,`${value}% alignment`,bodyBold,9.2,W-M,y,color);
      page.drawRectangle({x:M,y:y-16,width:CW,height:8,color:rgb(.94,.91,.92)}); page.drawRectangle({x:M,y:y-16,width:CW*value/100,height:8,color}); y-=50;}
    two(page,170,120,'PRIMARY STYLE',[primary.name,primary.essence],'SECONDARY STYLE',[secondary.name,scores.isBlend?'This close secondary score is part of your personalized blend.':'Your next-highest tendency; not close enough to define a blended result.'],2);
    callout(page,'How to read this','Alignment scores describe how closely your answers matched each pattern; they are not clinical percentiles. A pattern is a protective strategy, not a personality flaw or permanent identity.',74,76);
  }

  const about=(key:ProfileKey,label:string)=>{const p=profiles[key],page=addPage(`${label}: ${p.name}`,'1. About yourself');
    para(page,p.rootCause,body,{x:M,y:TOP-4,width:CW,size:10,lineHeight:15,color:muted});
    two(page,294,186,'Strengths you may bring',p.strengths,'Core wounds your system may carry',p.coreWounds,5);
    two(page,91,183,'Fears underneath activation',p.fears,'Emotional landscape',p.emotions,4);};
  const relationships=(key:ProfileKey,label:string)=>{const p=profiles[key],page=addPage(`${label}: needs and behavior`,'2-3. Relationships and coping');
    callout(page,'What emotional safety means','Emotional safety is the felt sense that you can be honest, have needs, set boundaries, make mistakes, and experience conflict without being punished, humiliated, abandoned, controlled, or erased. It includes consistency, respect, and a believable path back to connection.',480,98);
    two(page,274,185,'Needs that support connection',p.needs,'Unspoken expectations to notice',p.expectations,5);
    two(page,76,181,'How you may communicate',p.communication,'Protective coping strategies',p.coping,5);};
  about(scores.primary,'PRIMARY STYLE'); relationships(scores.primary,'PRIMARY STYLE');
  if(scores.isBlend){about(scores.secondary,'SECONDARY STYLE');relationships(scores.secondary,'SECONDARY STYLE');}

  // Personalized cycle.
  {
    const page=addPage(scores.isBlend?'How your two styles interact':'Your activation map',scores.isBlend?'Your personalized blend':'Your protective pattern');
    para(page,scores.isBlend?`${primary.name} and ${secondary.name} are both meaningful. One may appear in calm moments and the other under stress, or different patterns may emerge with different people. Neither score cancels the other.`:`${primary.name} is your clearest pattern. This page connects the triggers, protective behaviors, and needs that can form your repeating relationship cycle.`,body,{x:M,y:TOP-4,width:CW,size:10.3,lineHeight:16,color:muted});
    const triggers=[...new Set([...primary.triggers,...(scores.isBlend?secondary.triggers:[])])].slice(0,5);
    const coping=[...new Set([...primary.coping,...(scores.isBlend?secondary.coping:[])])].slice(0,5);
    const needs=[...new Set([...primary.needs,...(scores.isBlend?secondary.needs:[])])].slice(0,5);
    two(page,311,165,'What may activate you',triggers,'What protection can look like',coping,5);
    card(page,M,123,CW,166,'What the behavior may be trying to protect',needs.map(n=>`The need for ${n.toLowerCase()}`),5);
    page.drawText('THE CYCLE TO WATCH',{x:M+16,y:101,size:8,font:bodyBold,color:rose});
    para(page,'Trigger -> protective story -> automatic coping -> short-term relief -> longer-term disconnection. Healing begins by interrupting the cycle between the story and the coping response.',bodyBold,{x:M+16,y:82,width:CW-32,size:9,lineHeight:13,color:navy});
  }

  // Communication and repair.
  {
    const page=addPage('Communication, conflict, and repair','Building earned security');
    para(page,'The goal is not to suppress your attachment response. It is to create enough space to understand it, communicate it, and choose behavior that protects both connection and self-respect.',body,{x:M,y:TOP-4,width:CW,size:10.3,lineHeight:16,color:muted});
    const steps=[['1','NOTICE','Name the body cue: racing thoughts, tightness, numbness, irritation, urgency, or the impulse to disappear.'],['2','REGULATE','Slow the reaction with breathing, movement, grounding, or a clearly timed pause.'],['3','REALITY-CHECK','Separate observable facts from the old story your nervous system supplied.'],['4','REQUEST','Ask for one specific, respectful action instead of testing, chasing, attacking, or withdrawing.'],['5','RETURN','Listen, clarify impact, take responsibility where needed, and complete the repair.']];
    let y=482; for(const [n,title,copy] of steps){page.drawCircle({x:M+17,y:y+4,size:16,color:n==='5'?navy:rose}); page.drawText(n,{x:M+17-bodyBold.widthOfTextAtSize(n,10)/2,y,size:10,font:bodyBold,color:white});
      page.drawText(title,{x:M+47,y:y+3,size:9.2,font:bodyBold,color:rose}); para(page,copy,body,{x:M+130,y:y+3,width:CW-130,size:9.3,lineHeight:13.5,color:muted}); y-=64;}
    callout(page,'Repair language','“I notice I am activated, and the story I am telling myself is ____. What I know for certain is ____. I need ____. Would you be willing to ____? If we need a pause, can we agree to return at ____?”',76,112,white);
  }

  // Healing plan.
  {
    const page=addPage('Your path toward healing','4. Awareness, reframing, and practice');
    const practices=[...new Set([...primary.secureAlternatives,...primary.growth,...(scores.isBlend?secondary.secureAlternatives.slice(0,2):[])])].slice(0,6);
    let y=TOP-2; practices.forEach((practice,i)=>{page.drawCircle({x:M+17,y:y+3,size:15,color:i%2?navy:rose}); const n=String(i+1); page.drawText(n,{x:M+17-bodyBold.widthOfTextAtSize(n,9)/2,y,size:9,font:bodyBold,color:white}); para(page,practice,bodyBold,{x:M+48,y:y+4,width:CW-48,size:9.5,lineHeight:14,color:ink}); y-=54;});
    callout(page,'A thought reframe to practice','Old protection: “This feeling proves I am unsafe, unwanted, trapped, or alone.” New language: “My system recognizes an old danger. I can slow down, check the present facts, honor my boundary, and ask clearly for what I need.”',139,104);
    callout(page,'Your two-week experiment','Choose one practice above. Record the trigger, the old impulse, the new response, and what happened next. Security grows through repeated experiences of staying connected without abandoning yourself.',65,64,white);
  }

  // Reflection.
  {
    const page=addPage('Reflection prompts','Make this profile yours');
    const prompts=['Which core wound or fear feels most connected to your behavior today?','What does emotional safety look like in observable actions - not just feelings?','Which unspoken expectation could become a clear request?','What is your earliest sign of activation or deactivation?','Which coping strategy helps briefly but creates distance later?','What secure behavior will you repeat for two weeks?'];
    let y=TOP-2; prompts.forEach((p,i)=>{page.drawText(`${i+1}.`,{x:M,y,size:10,font:bodyBold,color:rose}); const b=para(page,p,bodyBold,{x:M+25,y,width:CW-25,size:9.6,lineHeight:14,color:ink});
      page.drawLine({start:{x:M+25,y:b-9},end:{x:W-M,y:b-9},thickness:.6,color:rule}); page.drawLine({start:{x:M+25,y:b-31},end:{x:W-M,y:b-31},thickness:.6,color:rule}); y=b-61;});
    callout(page,'A closing reminder','Your attachment style describes what your system learned to do, not who you are. Progress can look like a clearer boundary, a slower reaction, a direct request, or returning to a conversation you once would have chased or avoided.',63,90);
  }

  const total=pdf.getPageCount(); pdf.getPages().forEach((page,i)=>{if(i===0)return; page.drawLine({start:{x:M,y:45},end:{x:W-M,y:45},thickness:.5,color:rule});
    page.drawText('SECURELY LOVED  |  Personalized Attachment Profile',{x:M,y:27,size:7.2,font:body,color:muted}); right(page,`${i+1} / ${total}`,body,7.2,W-M,27,muted);});
  return pdf.save();
}
