import React from 'react';
import EwGui, { 
  ButtonEW, 
  LabelEW, 
  SliderEW, 
  RadioEW, 
  TogglerEW, 
  DropdownEW, 
  UniversalUploaderEW,
  ColorPickerEW,
  ImageUploaderEW,
  FolderEW,
  DropdownThumbnailsEW,
  StepButtonEW,
  VectorControllerEW,
  SplitEW,
  FolderSplitEW,
  TextareaEW,
  LinkUploaderEW,
  PreloaderEW,
  Toggler3xEW,
  ImageAndTextEW
} from "./ewGui";


import IsDetective from "./IsDetective";

import { useState } from "react";

export default function EwGuiSandbox() {

  const isMobile = IsDetective()
  const [slider, setSlider] = useState(0)
  const [slider1, setSlider1] = useState(0)
  const [slider2, setSlider2] = useState(0)
  const [slider3, setSlider3] = useState(0)
  const [filePath, setFilePath] = useState(null)
  const [imagePath, setImagePath] = useState('')
  const [textInput, setTextInput] = useState('Your prompt here...');
  const [linkInput, setLinkInput] = useState('http://...');

  const [ vector, setVector] = useState({x:0,y:0})
  const [color, setColor] = useState('#000000')
  const [isRun, setIsRun] = useState(false)
  const [imageOutput, setImageOutput] = useState(null);



  const itemsGui = [
    { label: 'Dark', value: '1' },
    { label: 'Light', value: '2' },
    { label: 'Sunday', value: '3' },
    { label: 'Night', value: '4' },
    { label: 'Monday', value: '5' },
    { label: 'Friday', value: '6' },
  ]
  const [ dropdown, setDropdown] = useState(itemsGui[0])

  const itemsThumb = [
    { label: 'Item 1', value: 'value1', thumbnail: 'images/thumbnails/thumb_1.png' },
    { label: 'Item 2', value: 'value2', thumbnail: 'images/thumbnails/thumb_2.png' },
    { label: 'Item 3', value: 'value3', thumbnail: 'images/thumbnails/thumb_3.png' },
    { label: 'Item 4', value: 'value4', thumbnail: 'images/thumbnails/thumb_4.png' },
    { label: 'Item 5', value: 'value5', thumbnail: 'images/thumbnails/thumb_5.png' },
    { label: 'Item 6', value: 'value6', thumbnail: 'images/thumbnails/thumb_6.png' },
  ];

  const handlePreloaderStop = () => {
    setIsRun(!isRun);
  }

  const handleDropdown = (item) => {
    setDropdown(item);
  };

  const [ demoStep, setDemoStep ]= useState(0)
  const [fileType, setFileType ] = useState('')

  const handleFileType = (type) =>{
    setFileType(type)
  }
  console.log(fileType)

  const handleTextAreaInput = (value) => {
    console.log(imagePath, textInput);
 
  };


  console.log(imageOutput);

  return (
    <>
    <div 
    style={{
      backgroundColor:color, 
      backgroundImage: imagePath ? `url(${imagePath})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }} 
    className="w-full h-screen">
      
      
      <div hidden className='
        grid gap-1 
        grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 
        grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8
        bg-[#FFFFFF]
      '/> 


    <EwGui 
      width={250} 
      data={isMobile ? false : true} 
      title={'Endless Work GUI'}
      attach={false}
      rollup={true}
      rounded={24}
      >
        
        <ImageAndTextEW
          value={textInput}
          onChange={setTextInput}
          imageValue={imagePath}
          onImageChange={setImagePath}
          onSubmit={handleTextAreaInput}
        />
        <TextareaEW 
          imageOut={imageOutput} 
          modeImage={true} 
          id={'TextareaEW 1'} 
          hidden={false} 
          buttonNeed={true}  
          title={'Text Prompt'} 
          value={textInput} 
          onChange={setTextInput} 
          titleButton={'Send text'} 
          onClickButton={handleTextAreaInput}
        />
        <LinkUploaderEW id={'LinkUploaderEW 1'} value={linkInput} onChange={setLinkInput} hidden={false} title={'Image Link'} height={'100px'} />
        
        <PreloaderEW run={isRun}/>
        <ButtonEW folder={false} title={'Play/Stop Loader'} onClick={handlePreloaderStop} width={'100%'}/>

        <LabelEW title={'Folders'}/>
        <VectorControllerEW hidden={false} title={'Manipulator'} id={'VectorControllerEW 1'} height={'100px'}  onChange={setVector}/>

     

        <FolderEW  id={'FolderEW 1'} title={'Folder'} >
          <SliderEW folder={true} title={'Position'} min={0} max={1} step={0.001} value={slider1} onChange={setSlider1} />
          <SliderEW folder={true} title={'Rotation'} min={0} max={1} step={0.001} value={slider2} onChange={setSlider2} />
          <SliderEW folder={true} title={'Light'} min={0} max={1} step={0.001} value={slider3} onChange={setSlider3} />
        </FolderEW>

        <FolderEW id={'FolderEW 2'} title={'Buttons'} >
        <ButtonEW folder={true} title={'Hello'} onClick={handlePreloaderStop} width={'100%'}/>
        <TogglerEW folder={true} title_a={'Dark'} title_b={'Light'} onClick_a={()=>alert('Dark')} onClick_b={()=>alert('Light')}/>
        <RadioEW folder={true} start={false} title_a={'True'} title_b={'False'} onClick={()=>alert('Hello world')} width={'100%'}/>
        <StepButtonEW  folder={true} title={'Steps'} min={0} max={100} step={10} value={demoStep} setFunction={setDemoStep} width={'100%'}/>
        </FolderEW>

        <ColorPickerEW id={'ColorPickerEW 1'} hidden={false} value={color} onChange={setColor} title={'Color picker'}/>
        <UniversalUploaderEW hidden={false} id={'UniversalUploaderEW 1'}  onFileLoaded={setFilePath} title={'Upload 3D model'} height={'100px'} getFileType={handleFileType}/>
        <ImageUploaderEW id={'ImageUploaderEW 1'} asBase64={true}  defaultImage={imagePath} onImageLoaded={setImagePath} title={'Upload Image'} height={'100px'}/> 

        <LabelEW title={'Selectors'}/>
        <DropdownThumbnailsEW id={'DropdownThumbnailsEW 2'} items={itemsThumb}  width="100%" title="Model" cols={3}/>
        <DropdownEW id={'DropdownEW 1'} title={'Selectors'}  items={itemsGui} onSelect={handleDropdown} width={'100%'}  cols={2} /> 

        <LabelEW title={'Buttons'}/>

        <FolderEW title={'Steps'}>
          <FolderSplitEW>
            <StepButtonEW design={true} split={true} folder={false} title={'Steps'} min={0} max={100} step={10} value={demoStep} setFunction={setDemoStep} width={'100%'}/>
            <StepButtonEW design={true} split={true} folder={false} title={'Steps'} min={0} max={100} step={10} value={demoStep} setFunction={setDemoStep} width={'100%'}/>
          </FolderSplitEW>
        </FolderEW>

        <StepButtonEW split={false} folder={false} title={'Steps'} min={0} max={100} step={10} value={demoStep} setFunction={setDemoStep} width={'100%'}/>

        <SliderEW folder={false} title={'Ranger'} min={0} max={1} step={0.001} value={slider} onChange={setSlider} /> 

        <TogglerEW 
          title_a={'Dark'} 
          title_b={'Medium'} 
          onClick_a={()=>alert('Dark')} 
          onClick_b={()=>alert('Medium')} 
        />

        <Toggler3xEW 
          title_a={'Dark'} 
          title_b={'Medium'} 
          title_c={'Light'} 
          onClick_a={()=>alert('Dark')} 
          onClick_b={()=>alert('Medium')} 
          onClick_c={()=>alert('Light')}
        />

        <RadioEW  split={false} folder={false} start={false} title_a={'True'} title_b={'False'} onClick={()=>alert('Hello world')} width={'100%'}/>
     
        <SplitEW>
          <RadioEW  split={true} folder={false} start={false} title_a={'True'} title_b={'False'} onClick={()=>alert('Hello world')} width={'100%'}/>
          <ButtonEW split={true} folder={false} title={'Hello'} onClick={()=>alert('Hello world')} width={'100%'}/>
        </SplitEW>

    </EwGui>


    </div>
    </>
  );
}
