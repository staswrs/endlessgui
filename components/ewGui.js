

import React, { useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { HexColorPicker } from "react-colorful";
import CopyThisData from "./CopyThisData";
import { useComponentValues, ComponentValueProvider, useOutputComponentData } from "./useComponentValues";
import IsDetective from "./IsDetective";



const margin = '5px 15px 5px 15px'
const marginMobile = '5px 25px 5px 25px'
const marginLabel = '0px 15px 0px 15px'
const padding = '5px'


////////////////////////////////////////////////////////////////////////////////
// INSIDE GUI ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


function DataPopupEW({ isOpen, componentValues }) {
 

  const startPosition = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const newX = e.clientX - startPosition.current.x;
        const newY = e.clientY - startPosition.current.y;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);


  const handleMouseDown = (e) => {
    isDragging.current = true;
    startPosition.current = {
      x: e.clientX - position.x ,
      y: e.clientY - position.y,
    };
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      id="DataPopupEW" 
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseDown={handleMouseDown}
      onClick={() => CopyThisData("DataPopupEW")} 
      className=" 
      flex  
      flex-col 
      font-sans 
      font-regular
                xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm  
      tracking-[-0.055rem]  
      leading-[-0.313rem] 
      backdrop-blur-lg
      bg-[#181818]/80  
      hover:bg-[#181818]/50    
      hover:cursor-grab
      p-[20px]  
      mt-[5px]  
      mb-[5px]  
      rounded-[24px]
      fixed
      bottom-1/4
      right-1/3
      select-none
      z-50
      ">
      {Object.entries(componentValues).map(([key, value]) => (
        <div key={key} className="flex justify-between ">
          <div className="text-white/50 ">{key} : {value}</div>
        </div>
      ))}
    </div>,
    document.body
  );
}

function DataButtonEW({value, setFunction}){
  return(
    <>
    <div className="flex justify-center items-center flex-col w-[100%] ">
        <div 
          style={{
            height:'auto',
          }} 
          onClick={() => setFunction(!value)}
          className="
          font-sans  
          font-regular
          items-center
          tracking-[-0.005rem] 
          leading-[-0.313rem]
          flex 
          flex-col
          justify-center 
          text-white/50
          hover:cursor-pointer
          hover:text-white
          ">
          <div className="flex text-[15px] m-[5px] p-[0px]   items-center"> ﹖ </div>
        </div>
      </div>
    </>
  )
}

function GrabButtonEW({setFunction, width, title, isMobile, rollupStatus}){
  return(
    <>
    <div className="flex w-[100%] flex-col ">
      <div 
        onMouseDown={setFunction}
        style={{
          width:width,
          height:'auto'
        }}

        className="
          font-sans  
          font-regular
          items-center
          tracking-[-0.005rem] 
          leading-[-0.313rem]
          flex 
          flex-col
          justify-center 
          text-white/50
          hover:text-white
          hover:cursor-grab
          bg-gradient-to-b from-[#181818] from-40%  via-90% to-[#181818]to-10%
        ">

          {isMobile ? null : <div className="flex pr-[15px] text-[5px] p-[10px] pl-[15px] items-center">● ● ●</div>}
          <HeaderEW title={title} isMobile={isMobile} rollupStatus={rollupStatus}/>
      </div>
    </div>
    </>
  )
}

function HeaderEW({title, isMobile, rollupStatus}){
  // const [isActive, setIsActive] = useState(rollupStatus)

  return(
    <>
    <div className="flex w-[100%] ">
        <div 
          style={{
            margin:margin, 
            height:'auto'
          }}
          className={` 
           w-[100%]
          font-sans  
          font-regular
          ${isMobile ? 'text-xlMobile ' : 'text-xl '}
          text-white
          text-center
          items-center
          bg-black/0
          tracking-[-0.055rem] 
          flex 
          ${isMobile ? 'justify-between ': 'justify-center' }
          ${isMobile ? 'pl-[16px] pr-[16px] pt-[10px] pb-[10px]': 'p-[10px] ' }
          m-[5px] 
          rounded-[13px]
          `}>
        {title}
        {isMobile ?  <div className={`flex justify-center items-center ${rollupStatus ? 'rotate-0' : 'rotate-180'} origin-center pr-[5px] pl-[5px] text-[10px]`}> ▼ </div> : null}
       
        </div>
    </div>
    </>
  )
}

function ShowGroupButtonEW({title, setFunction, value, children, selectedItem}){


  const [isActive, setIsActive] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    setIsActive(value);
  }, [value]);

  return(
    <>
    <div  
         
    className="flex flex-col w-[100%]"> 
        <div 

          style={{
            padding:'5px',
            // background: isActive || isFocus || value ? '#242424' : null
            background: isActive || isFocus || value ? '#242424' : 'rgba(36, 36, 36, 0.1)'
          }}
          
          className={`
            flex 
            flex-col
            w-[100%]
            font-regular
            font-sans  
            xs:text-sMob
            s:text-sMob
            sm:text-s 
            md:text-s 
            lg:text-s 
            xl:text-s 
            2xl:text-s 
            items-center
            tracking-[-0.015rem] 
            leading-[-0.313rem]
            justify-between 
            text-white/50
            duration-500 
            transition 
            rounded-[13px]
            hover:cursor-pointer
            `}
        >
          <div className="flex w-[100%] justify-between">
          <div 
            onPointerEnter={()=>{setIsFocus(true)}}
            onPointerOut={()=>{setIsFocus(false)}}
            className="flex w-full justify-self-center pl-[5px] hover:text-white"
            onClick={() => (setFunction(!value), setIsActive(isActive === false ? true : false) )}  
          >

          {title}  
          {selectedItem && (
            <>  &nbsp;  <div className="flex text-white/80">{selectedItem}</div> </>
          )}  
      
          </div>
    
          {isActive ? (
            <div 
            style={{color: isFocus ? '#FFFFFF' : null}}
            className="flex justify-center items-center rotate-180 origin-center pr-[5px] pl-[5px] text-[10px]"> ▼ </div>
          ):(
            <div 
            style={{color: isFocus ? '#FFFFFF' : null}}
            className="flex justify-center items-center rotate-0 origin-center pr-[5px] pl-[5px] text-[10px]"> ▼ </div>
          ) }
          
          </div>
          
          {children}
        </div>
   
    </div>
    </>
  )
}

////////////////////////////////////////////////////////////////////////////////
// INFO ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


export function LabelEW({title,width}){
  const isMobile = IsDetective();

  return(
    <>
      <div 
        style={{
          width:width,
          margin:marginLabel,
        }}
        className={`
        font-sans  
        font-regular
        text-[10px]
        uppercase
        tracking-[-0.015rem] 
        text-center
        items-center
        flex 
        justify-center 
        text-white/20
        p-[5px]
        ${isMobile ? 'pl-[70px]' : 'pl-[20px]'} 
        ${isMobile ? 'pr-[70px]' : 'pr-[20px]'} 
        rounded-[13px]
        `}>
      {title}
      </div>
    </>
  )
}

export function DataEW({ hidden = false }) {
  const { componentValues } = useComponentValues();
  const [isOpen, setIsOpen] = useState(hidden);

  return (
    <>
        <DataButtonEW value={isOpen} setFunction={setIsOpen}/>
        <DataPopupEW isOpen={isOpen} componentValues={componentValues} />
    </>
  );
}


////////////////////////////////////////////////////////////////////////////////
// Buttons ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


export function TogglerEW({ title_a, title_b, onClick_a, onClick_b, folder = false, split = false}) {
  const isMobile = IsDetective()
  const [isOn, setIsOn] = useState(true); 
  const [isFolder, setIsFolder] = useState(folder)
  const [isSplit, setIsSplit] = useState(split)

  const toggleSwitch = () => {
    setIsOn(!isOn); 
    if (isOn) {
      onClick_b && onClick_b();
    } else {
      onClick_a && onClick_a();
    }
  };

  return (
    <div        
      className="flex w-[100%] ">
      <div 
        style={{
          height:'30px', 
          margin: isFolder ? isMobile ? ' 4px' : '2px' : margin &&  isSplit ? isMobile ? '5px 5px 5px 5px' :'5px 5px 5px 5px' : isMobile ? marginMobile : margin,
        }}
        className="
        flex 
        flex-row 
        p-[0px]
        w-[100%]
        font-sans  
        items-center
        font-regular
                  xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm 
        bg-[#242424]
        tracking-[-0.015rem] 
        leading-[-0.313rem]
        rounded-[13px]
        text-white
        ">
          <div 
            style={{
              height:'30px',
  
            }}
            onClick={isOn ? null : toggleSwitch}
            className={`
              flex 
              justify-center
              rounded-l-[13px] 
              items-center
              m-[0px] 
              duration-500 
              transition 
              w-[50%]
              hover:bg-[#FFFFFF]
              hover:text-black
              ${isOn ? 'bg-[#BBBBBB] text-black' : ''}
              hover:cursor-pointer 
            `}> 
            {title_a}
          </div>
          <div 
            style={{
              height:'30px',
            }}
            onClick={isOn ? toggleSwitch : null}
            className={`
              flex 
              justify-center
              rounded-r-[13px]
              items-center
              w-[50%]
              duration-500 
              transition
              hover:bg-[#FFFFFF]
              hover:text-black
              ${!isOn ? 'bg-[#BBBBBB] text-black' : ''}
              hover:cursor-pointer
            `}> 
            {title_b}
          </div>
      </div>

    </div>
  );
}

export function Toggler3xEW({ 
  title_a, 
  title_b, 
  title_c, 
  onClick_a, 
  onClick_b, 
  onClick_c, 
  folder = false, 
  split = false 
}) {
  const [selected, setSelected] = useState(0);
  const isMobile = IsDetective();
  const [isFolder, setIsFolder] = useState(folder)
  const [isSplit, setIsSplit] = useState(split)

  const buttons = [
    { title: title_a, onClick: onClick_a },
    { title: title_b, onClick: onClick_b },
    ...(title_c ? [{ title: title_c, onClick: onClick_c }] : []),
  ];



  return (
    <div className="flex" 
        style={{
          height:'30px', 
          margin: isFolder ? isMobile ? ' 4px' : '2px' : margin &&  isSplit ? isMobile ? '5px 5px 5px 5px' :'5px 5px 5px 5px' : isMobile ? marginMobile : margin,
        }}
    >
      <div className="flex w-full bg-[#242424] text-white font-sans text-sm rounded-[13px] overflow-hidden">
        {buttons.map((btn, index) => {
          const isSelected = selected === index;
          const isMiddle = buttons.length === 3 && index === 1;

          return (
            <div
              key={index}
              className={`
                flex-1 
                flex 
                justify-center 
                items-center 
                h-[30px] 
                cursor-pointer 
                transition 
                duration-300 
                hover:bg-white 
                hover:text-black 
                ${isSelected ? 'bg-[#BBBBBB] text-black' : ''} 
                ${index === 0 ? 'rounded-l-[13px]' : ''} 
                ${index === buttons.length - 1 ? 'rounded-r-[13px]' : ''} 
                ${isMiddle ? 'rounded-none' : ''}
              `}
              onClick={() => {
                setSelected(index);
                btn.onClick?.();
              }}
            >
              {btn.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ButtonEW({title, onClick, width, folder = false, split = false}){
  const isMobile = IsDetective()
  const [isFolder, setIsFolder] = useState(folder)
  const [isSplit, setIsSplit] = useState(split)
  return(
    <>
    <div 
      className="flex w-[100%]"
    >
        <div 
        onClick={onClick}
        style={{
          width:width,
          height:'30px',
          margin: isFolder ? isMobile ? ' 4px' : '2px' : margin &&  isSplit ? isMobile ? '5px 5px 5px 5px' :'5px 5px 5px 5px' : isMobile ? marginMobile : margin,
        }}
        className={`
        flex 
                  xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm  
        font-sans  
        font-regular
        items-center
        justify-center 
        text-black
        rounded-[13px]
        bg-[#BBBBBB]
        hover:bg-white
        hover:cursor-pointer
        `}
        > 
        {title}
        </div>
    </div>
    </>
  )


}

export function RadioEW({title_a, title_b, onClick, width, start, folder = false, split = false}){
  const isMobile = IsDetective()
  const [radioInOut, setRadioInOut] = useState(start)
  const [isFolder, setIsFolder] = useState(folder)
  const [isSplit, setIsSplit] = useState(split)

  const toggleRadioEW = ()=>{
    setRadioInOut(radioInOut == false ? true : false)
    onClick()
  }

  return(
    <>
    <div         
    className="flex p-[0px] w-[100%]">
    <div 
        onClick={toggleRadioEW}
        style={{
          height:'30px',
          margin: isFolder ? isMobile ? ' 4px' : '2px' : margin &&  isSplit ? isMobile ? '5px 5px 5px 5px' :'5px 5px 5px 5px' : isMobile ? marginMobile : margin,
          width:width,
        }}
        className={`
        flex 
        font-sans  
				font-regular
                  xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm 
				tracking-[-0.015rem]
        items-center 
				leading-[-0.313rem]
        justify-center
        items-center  
        ${radioInOut ? 'bg-[#BBBBBB] text-[#000000] hover:bg-[#FFFFFF]'  : 'bg-[#242424] text-[#FFFFFF] hover:bg-[#BBBBBB] hover:text-[#000000]' }
        rounded-[13px] 
        pl-[20px]
        pr-[20px]
        duration-500 
        transition 
        hover:cursor-pointer `}> 
        { radioInOut ? title_a : title_b}
        </div>
    </div>
    </>
  )
}

export function StepButtonEW({ title, min, max, step, setFunction, value, width, folder=false, split = false, design }) {

  const handleClick = () => {
    let newValue = value + step;
    if (newValue > max) {
      newValue = min;
    }
    setFunction(newValue);
  };

  const [isFolder, setIsFolder] = useState(folder)
  const [isSplit, setIsSplit] = useState(split)
  const [isDesign , setIsDesign] = useState(design)
  const isMobile = IsDetective()

  return (
    <>
    <div className="flex w-[100%]">
      <div 
        style={{
          width:width, 
          padding:padding,
          height:isDesign ? '45px' : '30px',
          margin: isFolder ? isMobile ? ' 4px' : '2px' : margin &&  isSplit ? isMobile ? '5px 5px 5px 5px' :'5px 5px 5px 5px' : isMobile ? marginMobile : margin,
        }}
        onClick={handleClick}
        className={`
          font-sans  
          font-regular
                    xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm  
          tracking-[-0.015rem] 
          leading-[-0.313rem]
          flex 
          flex-row
          ${isDesign ? 'items-end' : ' items-center '}
          justify-between 
          text-black
          rounded-[7px]
          bg-[#BBBBBB]
          hover:cursor-pointer
          hover:bg-[#FFFFFF]
          hover:text-black
          `}>

        <div className="flex pl-[5px]">
        {title} 
        </div>

        <div className={`flex pr-[5px] ${isDesign ? 'text-[20px]' : null}`}>
        {value}
        </div>
        
      </div>
    </div>

    </>
  );
}

export function SliderEW({title, min, max, step, value, onChange, folder}) {

  const isMobile = IsDetective()
  const [isFolder, setIsFolder] = useState(folder)
  const [isActive, setIsActive] = useState(false)
  const trackRef = useRef(null);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = (position) => {
    if (trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      let newPosition = position - trackRect.left;
      newPosition = Math.max(newPosition, 0);
      newPosition = Math.min(newPosition, trackRect.width);
      const newValue = (newPosition / trackRect.width) * (max - min) + min;
      const roundedValue = (Math.round(newValue / step) * step);
      onChange(parseFloat(roundedValue).toFixed(2)); 
    }
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    handleMove(event.clientX);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    handleMove(event.touches[0].clientX);
  };

  const handleMouseDown = (event) => {
    event.preventDefault(); 
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp, { once: true });
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp, { once: true });
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchmove', handleTouchMove);
  };

  useOutputComponentData(title,value)

  return (
    <div 
    style={{
      height:isFolder ? '30px' : '30px',
      background:isFolder ? null : '#242424',
      margin:isFolder ? isMobile ? '4px' :'2px' : isMobile ? marginMobile : margin     
    }}
    className="
    flex 
    justify-between 
    rounded-[13px]
    ">
      <div 
      style={{ 
        color:isActive ? '#ffffff' : null, 
        paddingLeft: isFolder ? '3px' : '10px',
      }}
      className="
      flex 
      font-sans 
      font-regular
      xs:text-smMob
      s:text-smMob
      sm:text-sm 
      md:text-sm 
      lg:text-sm 
      xl:text-sm 
      2xl:text-sm 
      tracking-[-0.015rem] 
      leading-[-0.313rem] 
      items-center 
      text-white/20
      
      ">
        {title}
      </div>

      <div className="
      flex 
      w-full 
      custom-range-slider 
      items-center  
      text-black 
      rounded-[13px] 
      duration-500 
      transition 
      ml-[10px]  
      mr-[10px]
      hover:cursor-pointer
      ">
        <div className="flex w-full slider-container ml-[10px]  mr-[10px]">
          <div ref={trackRef} style={{width:'100%'}} className="slider-track h-[10px] relative rounded-[10px]">
            <div 
                className=""
                onPointerEnter={()=>{setIsActive(true)}}
                onPointerOut={()=>{setIsActive(false)}}
                style={{
                position: 'absolute',
                top: '-8px',
                left: `${percentage}%`,
                width: '25px',
                height: '25px',
                backgroundColor: '#FFFFFF',
                opacity:isActive ? 1.0 : 0.2,
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                cursor: 'pointer',
       
              }}
        
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            />
         
          </div>
        </div>

        <div 
          style={{
            color:isActive ? '#ffffff' : null,
            marginRight: isFolder ? '-9px' : '0px',
            paddingLeft: isFolder ? '3px' : '0px',
          }}
          className="
          flex 
          justify-center
          xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm 
          text-white/20
          leading-[-0.313rem] 
          items-center 
          ">
          {parseFloat(value).toFixed(2)}
        </div>

      </div>

   
    </div>
  );
}



////////////////////////////////////////////////////////////////////////////////
// Parents  ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


export function DropdownEW({ items=[], onSelect, title, hidden = false, cols, id, activeId, setActiveId, isAttach }) {
  
  console.log(isAttach)

  const isMobile = IsDetective()

  const [isOpenState, setIsOpenState] = useState(hidden); 
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState; 

  const handleToggle = () => {
    if (isMobile || isAttach ) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState); 
    }
  };



  const dropdownRef = useRef(null);

  const [currentItem, setCurrentItem] = useState(() => {
    return items.length > 0 ? items[0].label : 'Select an item';
  });
  useOutputComponentData(title,currentItem)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div className="flex flex-col p-[0px] w-[100%]">
          <div style={{
            margin:isMobile ? marginMobile : margin
            }} className="flex flex-row justify-between ">
            {title ? (
              <ShowGroupButtonEW title={title} selectedItem={currentItem} value={isOpen} setFunction={handleToggle} >
              {isOpen  && (
                <div className="
                origin-top-right
                mt-[5px]
                mb-[5px]
                flex 
                font-sans  
                font-regular
                          xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm 
                tracking-[-0.015rem] 
                leading-[-0.313rem]
                items-center  
                text-white 
                w-[100%]
                rounded-[13px] 
                p-[0px] 
                justify-center
                hover:cursor-pointer">
                  <div className={`w-full m-[5px] grid grid-cols-${cols} gap-1`} >

                    {items && items.map((item, index) => (
                    
                      <a
                        href="#"
                        key={index}
                        className={`
                          flex 
                          mt-[0px] 
                          pt-[5px]
                          pb-[5px]
                          text-center
                          justify-center
                          rounded-[7px]
                          ${currentItem === item.label ? null : 'bg-white/5'}
                          hover:bg-white/0
                          text-white/50
                          hover:text-white
                        `}
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          onSelect(item);
                          setCurrentItem(item.label)
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              </ShowGroupButtonEW>
            ) : (
                  <div className="
                  origin-top-right
                  flex 
                  font-sans  
                  font-regular
                            xs:text-smMob
          s:text-smMob
          sm:text-sm 
          md:text-sm 
          lg:text-sm 
          xl:text-sm 
          2xl:text-sm 
                  bg-[#242424]
                  tracking-[-0.015rem] 
                  leading-[-0.313rem]
                  items-center  
                  text-white 
                  w-[100%]
                  rounded-[13px] 
                  p-[10px] 
                  justify-center
                  hover:cursor-pointer">
                    <div className={`w-full m-[5px] grid grid-cols-${cols} gap-1`} >

                      {items && items.map((item, index) => (
                      
                        <a
                          href="#"
                          key={index}
                          className={`
                            flex 
                            pt-[5px]
                            pb-[5px]
                            text-center
                            justify-center
                            rounded-[7px]
                            ${currentItem === item.label ? null : 'bg-white/5'}
                            ${currentItem === item.label ? 'text-white' : 'text-white/50'}
                            hover:bg-white/0
                            hover:text-white
                          `}
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault();
                            onSelect(item);
                            setCurrentItem(item.label)
                          }}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
            )}
          </div>
      </div>


  );
}

export function DropdownThumbnailsEW({ items = [], onSelect,  title, hidden = false, cols, id, activeId, setActiveId, isAttach }) {

    
  const isMobile = IsDetective()


    
  const [isOpenState, setIsOpenState] = useState(hidden); 
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState;

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState);
    }
  };

  const dropdownRef = useRef(null);

  const [currentItem, setCurrentItem] = useState(() => {
    return items.length > 0 ? items[0] : { label: '', value: '' };
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (



      <div className="flex flex-col p-[0px] w-[100%]">
        <div style={{
          margin:isMobile ? marginMobile : margin
          }} className="flex flex-row justify-between ">
        { title ? (
          <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle} >
          {isOpen && (
            <div id='Container' className=" 
            flex 
            justify-center
            rounded-[13px] 
            p-[5px] 
            mt-[5px] 
            mb-[2px]
            duration-500 
            transition  
            hover:cursor-pointer">
              <div id='Grid' className={`w-[100%] grid grid-cols-${cols} gap-1`} >
                {items && items.map((item, index) => (
                  <a 
                  href="#" 
                  id='item' 
                  key={index} 
                  className="
                  flex 
                  justify-center
                  p-[3px] 
                  m-[2px] 
                  hover:bg-white/20
                  rounded-[7px]" 
                  onClick={(e) => { e.preventDefault(); onSelect(item); setCurrentItem(item);}}>
                    <img 
                    src={item.thumbnail} 
                    alt={item.label} 
                    className=" w-[100%] h-[100%] rounded-[7px]" 
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
          </ShowGroupButtonEW>
        ) : (
            <div id='Container' className=" 
            flex 
            justify-center
            rounded-[13px] 
            bg-[#242424]
            p-[5px] 
            duration-500 
            transition  
            hover:cursor-pointer">
              <div id='Grid' className={`w-[100%] grid grid-cols-${cols} gap-1`} >
                {items && items.map((item, index) => (
                  <a 
                  href="#" 
                  id='item' 
                  key={index} 
                  className="
                  flex 
                  justify-center
                  p-[7px] 
                  m-[2px] 
                  hover:bg-white/20
                  rounded-[7px]" 
                  onClick={(e) => { e.preventDefault(); onSelect(item); setCurrentItem(item);}}>
                    <img 
                    src={item.thumbnail} 
                    alt={item.label} 
                    className=" w-[100%] h-[100%] rounded-[13px]" 
                    />
                  </a>
                ))}
              </div>
            </div>
        ) }
        </div>
      </div>




  );
}


export function ImageUploaderEW({
  onImageLoaded,
  hidden = false,
  title,
  height,
  defaultImage,
  id,
  activeId,
  setActiveId,
  isAttach,
  asBase64 = false // 💡
}) {
  const isMobile = IsDetective();
  const [isOpenState, setIsOpenState] = useState(hidden);
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState;
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setBackgroundImage(defaultImage);
  }, [defaultImage]);

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState);
    }
  };

  const handleFile = (file) => {
    if (!file) return;

    if (asBase64) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setBackgroundImage(base64String);         // 👈 используем Base64 в preview
        onImageLoaded(base64String);              // 👈 возвращаем Base64
      };
      reader.readAsDataURL(file);
    } else {
      const url = URL.createObjectURL(file);
      setBackgroundImage(url);                    // 👈 используем blob URL
      onImageLoaded(url);                         // 👈 возвращаем URL
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };
  const handleTextClick = () => fileInputRef.current?.click();

  return (
    <div className="flex w-full">
      <div style={{ margin: isMobile ? marginMobile : margin }} className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          {title ? (
            <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle}>
              {isOpen && (
                <div
                  style={{
                    height,
                    background: backgroundImage ? `url(${backgroundImage}) no-repeat center center / cover` : 'bg-black/20',
                  }}
                  className="duration-500 transition flex w-full h-[30vh] text-white/30 rounded-[10px] justify-center text-center uppercase hover:cursor-pointer items-center mt-[10px] bg-[#1E1E1E]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={handleTextClick}
                >
                  <span className={`flex justify-center items-center text-[14px] rounded-full w-[30px] h-[30px] ${backgroundImage ? 'bg-white/80 text-black hover:bg-white/20 hover:text-white' : 'bg-white/20 hover:bg-white/80 hover:text-black'}`}>
                    ↑
                  </span>
                </div>
              )}
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
            </ShowGroupButtonEW>
          ) : (
            <>
              <div
                style={{
                  height,
                  background: backgroundImage ? `url(${backgroundImage}) no-repeat center center / cover` : 'bg-black/20',
                }}
                className="duration-500 transition flex w-full h-[30vh] text-white/30 rounded-[10px] justify-center text-center uppercase hover:cursor-pointer items-center bg-[#1E1E1E]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={handleTextClick}
              >
                <span className={`flex justify-center items-center text-[14px] rounded-full w-[30px] h-[30px] ${backgroundImage ? 'bg-white/80 text-black hover:bg-white/20 hover:text-white' : 'bg-white/20 hover:bg-white/80 hover:text-black'}`}>
                  ↑
                </span>
              </div>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export function UniversalUploaderEW({ onFileLoaded, hidden = false, title, height, id, activeId, setActiveId, isAttach, getFileType }) {
 const isMobile = IsDetective()

  const [isOpenState, setIsOpenState] = useState(hidden); 
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState; 


  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState); 
    }
  };

 const [isFileName, setIsFileName ] = useState('')


 const fileInputRef = useRef(null);

 const [backgroundColors, setBackgroundColor] = useState(''); 
 const handleDragOver = (e) => {
   e.preventDefault();
 };

 const handleDrop = (e) => {
   e.preventDefault();
   const file = e.dataTransfer.files[0];
   setIsFileName(file.name)

   

   if (!file) return;
   setBackgroundColor('#000000')
   const url = URL.createObjectURL(file);
   const fileExtension = file.name.split('.').pop().toLowerCase();


   if (getFileType) {
    getFileType(fileExtension);
  }

   switch (fileExtension) {
     case 'fbx':
     case 'glb':
     case 'gltf':
     case 'obj':
     case 'pdf':
     case 'bin':
       onFileLoaded(url, file);
       break;
     default:
       console.error("Unsupported file type");
   }
 };


 const handleFileChange = (e) => {
   e.preventDefault();
   const file = e.target.files[0];
   setIsFileName(file.name)



   if (!file) return;
   
   setBackgroundColor('#000000')
   const url = URL.createObjectURL(file);
   const fileExtension = file.name.split('.').pop().toLowerCase();


   if (getFileType) {
    getFileType(fileExtension);
  }

   switch (fileExtension) {
     case 'fbx':
     case 'glb':
     case 'gltf':
     case 'obj':
     case 'pdf':
     case 'bin':
       onFileLoaded(url, file);
       break;
     default:
       console.error("Unsupported file type");
   }

 };

 const handleTextClick = () => {
   fileInputRef.current.click();
 };


//  useEffect(() => {
//    console.log('File name updated:', isFileName);
//  }, [isFileName]);

 return (
   <>
   <div className="flex w-[100%]"> 
       <div style={{ 
        margin:isMobile ? marginMobile : margin
        }} className="flex flex-col w-[100%]">
         <div className="flex flex-row justify-between">

         {title ? (
           <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle} >
           
           {isOpen && (
             <div 
               style={{
                 height: height,
               }}
               className={
                 `         
                 duration-500
                 transition
                 flex  
                 w-[100%] 
                 h-[30vh] 
                 text-white/30 
                 rounded-[10px] 
                 justify-center 
                 text-center 
                 uppercase 
                 hover:cursor-pointer
                 items-center 
                 mt-[10px]
                 ${backgroundColors ? 'gradient-background' : 'bg-[#1E1E1E]' }
                 `
               }
                 
                 onDragOver={handleDragOver} 
                 onDrop={handleDrop}
                 onClick={handleTextClick}
             >

               {backgroundColors ? (
                 <div className="flex flex-col justify-center items-center">
                 <span className="
                 flex 
                 justify-center 
                 items-center 
                 text-[14px] 
                 text-uppercase 
                 backdrop-blur-lg
                 bg-[#ffffff]/80  
                 rounded-[100px] 
                 w-[30px] 
                 h-[30px]
                 text-black
                 hover:text-white
                 hover:bg-white/20
                 mt-[5px]
                 ">
                 ↑ 
                 </span>
                 <span className="text-[10px] opacity-[1] mt-[5px]">
                   {isFileName}
                 </span>
                 </div>
               ):(
                 <span className="
                 flex 
                 justify-center 
                 items-center 
                 text-[14px] 
                 text-uppercase 
                 backdrop-blur-lg
                 bg-[#ffffff]/20  
                 rounded-[100px] 
                 w-[30px] 
                 h-[30px]
                 hover:text-black
                 hover:bg-white/80
                 ">
                 ↑ 
                 </span>
               )}
       
             </div>
           )}

           <input
             type="file"
             ref={fileInputRef}
             style={{ display: 'none' }}
             accept=".pdf,.fbx,.glb,.gltf,.obj"
             onChange={handleFileChange}
           />
           </ShowGroupButtonEW>
         ) : (
           <>
           <div 
             style={{
               height: height,
             }}
             className={
               `         
               duration-500
               transition
               flex  
               w-[100%] 
               h-[30vh] 
               text-white/30 
               rounded-[10px] 
               justify-center 
               text-center 
               uppercase 
               hover:cursor-pointer
               items-center 
               ${backgroundColors ? 'gradient-background' : 'bg-[#1E1E1E]' }
               `
             }
               
               onDragOver={handleDragOver} 
               onDrop={handleDrop}
               onClick={handleTextClick}
           >

             {backgroundColors ? (
               <div className="flex flex-col justify-center items-center">
               <span className="
               flex 
               justify-center 
               items-center 
               text-[14px] 
               text-uppercase 
               backdrop-blur-lg
               bg-[#ffffff]/80  
               rounded-[100px] 
               w-[30px] 
               h-[30px]
               text-black
               hover:text-white
               hover:bg-white/20
           
               ">
               ↑ 
               </span>
               <span className="text-[10px] opacity-[1] mt-[5px]">
                 {isFileName}
               </span>
               </div>
             ):(
               <span className="
               flex 
               justify-center 
               items-center 
               text-[14px] 
               text-uppercase 
               backdrop-blur-lg
               bg-[#ffffff]/20  
               rounded-[100px] 
               w-[30px] 
               h-[30px]
               hover:text-black
               hover:bg-white/80
               ">
               ↑ 
               </span>
             )}
     
           </div>
           <input
             type="file"
             ref={fileInputRef}
             style={{ display: 'none' }}
             accept=".pdf,.fbx,.glb,.gltf,.bin"
             onChange={handleFileChange}
           />
           </>
         )}

         </div>
       </div>
   </div>
   </>
 );
}

export function ColorPickerEW({hidden = false, value, onChange, title, id, activeId, setActiveId, isAttach  }){
  const isMobile = IsDetective()

  const [isOpenState, setIsOpenState] = useState(hidden); 
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState; 

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState); 
    }
  };

 useOutputComponentData(title,value)
 return(
   <>
   <div className="flex w-[100%]"> 
     <div style={{ 
      margin:isMobile ? marginMobile : margin
      }} className="flex flex-col p-[0px] w-[100%]">
         <div className="flex flex-row justify-between ">
           {title ? (
           <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle} >
               {isOpen && (
                 <div className="w-[100%] p-[0px] mt-[5px] mb-[2px]  rounded-[10px]">
                 <section className="ewGuiPicker p-[2px] pt-[0px] pb-[2px]">
                   <HexColorPicker color={value} onChange={onChange}/>
                 </section>
                 </div>
               )}
           </ShowGroupButtonEW>
           ):(
             <div className="w-[100%] p-[0px] rounded-[10px]">
             <section className="ewGuiPicker p-[0px] pt-[0px] pb-[0px]">
               <HexColorPicker color={value} onChange={onChange}/>
             </section>
             </div>
           )}
         </div>
     </div>
   </div>
   </>
 )
}

export function FolderEW({children, hidden = false, title, id, activeId, setActiveId, isAttach }){
  const isMobile = IsDetective()

  const [isOpenState, setIsOpenState] = useState(hidden); 
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState; 

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState); 
    }
  };

  return(
    <>
  
    <div       
    className="flex w-[100%]"> 
      <div style={{
         margin:isMobile ? marginMobile : margin
        }} className="flex flex-col p-[0px] w-[100%]">
          <div className="flex flex-row justify-between ">
          { title ? (
          <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle} >
          {isOpen && (
              <div className="
                flex 
                w-full
                flex-col 
                mt-[5px] 
                mb-[0px]
                rounded-[10px] 
                "> 
                  {children} 
                </div> 
            )}
          </ShowGroupButtonEW>
          ) : (
              <div className="
                flex 
                bg-[#242424]
                w-full
                flex-col 
                p-[5px]
                rounded-[10px] 
                "> 
                  {children} 
                </div> 
          )}
          </div>

      </div>
    </div>
    </>
  )
}


export function VectorControllerEW({ title, hidden = false, height, onChange, id, activeId, setActiveId, isAttach }) {
  const isMobile = IsDetective();

  const [isOpenState, setIsOpenState] = useState(hidden); 
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState; 

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState); 
    }
  };

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const circleRef = useRef(null);

  const { updateValue } = useComponentValues();

  useEffect(() => {
    if (containerRef.current && circleRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const circleRect = circleRef.current.getBoundingClientRect();
      setX((containerRect.width - circleRect.width) / 2);
      setY((containerRect.height - circleRect.height) / 2);
    }
  }, [isOpen]);

  const onMouseDown = () => {
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const circleRadius = circleRef.current.offsetWidth / 2;

    let newX = e.clientX - containerRect.left - circleRadius;
    let newY = e.clientY - containerRect.top - circleRadius;

    newX = Math.max(0, Math.min(newX, containerRect.width - 2 * circleRadius));
    newY = Math.max(0, Math.min(newY, containerRect.height - 2 * circleRadius));

    setX(newX);
    setY(newY);

    const normalizedX = ((newX / (containerRect.width - 2 * circleRadius)) * 2 - 1).toFixed(2);
    const normalizedY = ((newY / (containerRect.height - 2 * circleRadius)) * 2 - 1).toFixed(2);

    if (onChange) {
      onChange({ vectorX: normalizedX, vectorY: normalizedY });
    }

    updateValue(`${title}-X`, normalizedX);
    updateValue(`${title}-Y`, normalizedY);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };


  const onTouchStart = () => {
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const circleRadius = circleRef.current.offsetWidth / 2;

    let newX = touch.clientX - containerRect.left - circleRadius;
    let newY = touch.clientY - containerRect.top - circleRadius;

    newX = Math.max(0, Math.min(newX, containerRect.width - 2 * circleRadius));
    newY = Math.max(0, Math.min(newY, containerRect.height - 2 * circleRadius));

    setX(newX);
    setY(newY);

    const normalizedX = ((newX / (containerRect.width - 2 * circleRadius)) * 2 - 1).toFixed(2);
    const normalizedY = ((newY / (containerRect.height - 2 * circleRadius)) * 2 - 1).toFixed(2);

    if (onChange) {
      onChange({ vectorX: normalizedX, vectorY: normalizedY });
    }

    updateValue(`${title}-X`, normalizedX);
    updateValue(`${title}-Y`, normalizedY);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex w-[100%]">
      <div style={{ 
        margin:isMobile ? marginMobile : margin
        }} className="flex flex-col w-[100%]">
        <div className="flex flex-row justify-between">
          {title ? (
            <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle}>
              {isOpen && (
                <div
                  ref={containerRef}
                  style={{
                    height: height,
                    position: 'relative',
                  }}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseUp}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className="
                    duration-500
                    transition
                    flex  
                    w-[100%] 
                    h-[30vh] 
                    text-white/30 
                    rounded-[10px] 
                    justify-center 
                    text-center 
                    uppercase 
                    hover:cursor-pointer
                    items-center 
                    p-[15px]
                    mt-[5px] 
                    mb-[5px]"
                >
                  <div
                    ref={circleRef}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    className=" 
                    bg-white/50
                    hover:bg-white
                    "
                    style={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      position: 'absolute',
                      left: `${x}px`,
                      top: `${y}px`,
                      cursor: 'grab',
                    }}
                  ></div>
                </div>
              )}
            </ShowGroupButtonEW>
          ) : (
            <div
              ref={containerRef}
              style={{
                height: height,
                position: 'relative',
              }}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="
                duration-500
                transition
                flex  
                w-[100%] 
                h-[30vh] 
                text-white/30 
                rounded-[10px] 
                justify-center 
                text-center 
                uppercase 
                hover:cursor-pointer
                items-center 
                bg-[#242424]"
            >
              <div
                ref={circleRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className=" 
                bg-white/50
                hover:bg-white
                "
                style={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: `${x}px`,
                  top: `${y}px`,
                  cursor: 'grab',
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////
// Text ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


// export function TextareaEW({
//   title,
//   value,
//   hidden,
//   buttonNeed,
//   onChange,
//   rows = 4,
//   id,
//   activeId,
//   setActiveId,
//   isAttach,
//   titleButton,
//   onClickButton,
//   imageOut = '',
//   modeImage = false, 
//   disclamer = "Please enter a link to the image",
//   needDisclamer = false
// }) {
//   const isMobile = IsDetective();
//   const [needButton, setNeedButton] = useState(buttonNeed);
//   const [isOpenState, setIsOpenState] = useState(hidden);
//   const [isEdited, setIsEdited] = useState(false);
//   const hasCleared = useRef(false);
//   const isOpen = isMobile || isAttach ? activeId === id : isOpenState;
//   const [backgroundImage, setBackgroundImage] = useState(imageOut);

//   useEffect(() => {
//     setBackgroundImage(imageOut);
//   }, [imageOut]);

//   const handleToggle = () => {
//     if (isMobile || isAttach) {
//       setActiveId(isOpen ? null : id);
//     } else {
//       setIsOpenState(!isOpenState);
//     }
//   };

//   const handleChange = (e) => {
//     const text = e.target.value;
//     if (!isEdited) {
//       setIsEdited(true);
//       hasCleared.current = true;
//       onChange(text.slice(-1));
//     } else {
//       onChange(text);
//     }
//   };

//   const getTextClass = () => (isEdited ? 'text-white' : 'text-white/20');

//   return (
//     <div className="flex w-[100%]">
//       <div
//         style={{ margin: isMobile ? marginMobile : margin }}
//         className="flex flex-col w-[100%]"
//       >
//         <div className="flex flex-row justify-between">
//           {title ? (
//             <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle}>
//               {isOpen && (
//                 <>
//                   {modeImage === true && (
//                     <div
//                       style={{
//                         height: '150px',
//                         background: backgroundImage
//                           ? `url(${backgroundImage}) no-repeat center center / cover`
//                           : '#1E1E1E',
//                       }}
//                       className="duration-500 transition flex w-full text-white/30 rounded-[10px] justify-center items-center mt-[10px] bg-[#1E1E1E]"
//                     >
//                       {!backgroundImage && (
//                         <span className="text-[14px] text-white/20">No preview</span>
//                       )}
//                     </div>
//                   )}
//                   {needDisclamer == true ? <LabelEW title={disclamer} width={'100%'}/> : <></>}
//                   <textarea
//                     value={value}
//                     onChange={handleChange}
//                     rows={rows}
//                     className={`
//                       w-full
//                       bg-[#1E1E1E]
//                       ${getTextClass()}
//                       p-[10px]
//                       rounded-[10px]
//                       mt-[5px]
//                       resize-none
//                       font-sans
//                       text-sm
//                       focus:outline-none
//                       border border-white/10
//                       focus:border-white/40
//                       mb-[5px]
//                     `}
//                   />
//                   {needButton && (
//                     <ButtonEW title={titleButton} onClick={onClickButton} width={'100%'} folder={true} />
//                   )}
//                 </>
//               )}
//             </ShowGroupButtonEW>
//           ) : (
//             <>
//               <textarea
//                 value={value}
//                 onChange={handleChange}
//                 rows={rows}
//                 className={`
//                   w-full
//                   bg-[#1E1E1E]
//                   ${isEdited ? 'text-white' : 'text-white/20'}
//                   p-[10px]
//                   rounded-[10px]
//                   mt-[10px]
//                   resize-none
//                   font-sans
//                   text-sm
//                   focus:outline-none
//                   border border-white/10
//                   focus:border-white/40
//                 `}
//               />
//               <ButtonEW title={'Send'} onClick={() => console.log('Text:', value)} width={'100%'} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




export function TextareaEW({
  title,
  value,
  hidden,
  buttonNeed,
  onChange,
  rows = 4,
  id,
  activeId,
  setActiveId,
  isAttach,
  titleButton,
  onClickButton,
  imageOut = '',
  modeImage = false, 
  needDisclamer = false,
  disclamer = "Please enter a link to the image",
  status = false,                      // Новый проп
  ShaderLoaderComponent = null,        // Новый проп: любой React-компонент (шардер)
  widthInside = '100%',
  heightInside = '100%',
}) {
  const isMobile = IsDetective();
  const [needButton, setNeedButton] = useState(buttonNeed);
  const [isOpenState, setIsOpenState] = useState(hidden);
  const [isEdited, setIsEdited] = useState(false);
  const hasCleared = useRef(false);
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState;
  const [backgroundImage, setBackgroundImage] = useState(imageOut);

  useEffect(() => {
    setBackgroundImage(imageOut);
  }, [imageOut]);

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    if (!isEdited) {
      setIsEdited(true);
      hasCleared.current = true;
      onChange(text.slice(-1));
    } else {
      onChange(text);
    }
  };

  const getTextClass = () => (isEdited ? 'text-white' : 'text-white/20');

  return (
    <div className="flex w-[100%]">
      <div className="flex flex-col w-[100%]" style={{ margin: isMobile ? marginMobile : margin }}>
        <div className="flex flex-row justify-between">
          {title ? (
            <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle}>
              {isOpen && (
                <>
                  {modeImage === true && (
                    <div
                      style={{
                        height: '150px',
                        background: !status && backgroundImage
                          ? `url(${backgroundImage}) no-repeat center center / cover`
                          : '#1E1E1E',
                        borderRadius: 16,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10
                      }}
                      className="duration-500 transition w-full text-white/30 rounded-[16px] bg-[#1E1E1E]"
                    >
                      {/* Если статус загрузки — показываем Canvas */}
                      {status && ShaderLoaderComponent ? (
                        <div style={{
                          width: widthInside,
                          height: heightInside,
                          borderRadius: 16,
                          overflow: "hidden",
                          background: "#181818"
                        }}>
                          {ShaderLoaderComponent}
                        </div>
                      ) : (
                        !backgroundImage && (
                          <span className="text-[14px] text-white/20">No preview</span>
                        )
                      )}
                    </div>
                  )}
                  {needDisclamer === true ? <LabelEW title={disclamer} width={'100%'}/> : null}
                  <textarea
                    value={value}
                    onChange={handleChange}
                    rows={rows}
                    className={`
                      w-full
                      bg-[#1E1E1E]
                      ${getTextClass()}
                      p-[10px]
                      rounded-[10px]
                      mt-[5px]
                      resize-none
                      font-sans
                      text-sm
                      focus:outline-none
                      border border-white/10
                      focus:border-white/40
                      mb-[5px]
                    `}
                  />
                  {needButton && (
                    <ButtonEW title={titleButton} onClick={onClickButton} width={'100%'} folder={true} />
                  )}
                </>
              )}
            </ShowGroupButtonEW>
          ) : (
            <>
              <textarea
                value={value}
                onChange={handleChange}
                rows={rows}
                className={`
                  w-full
                  bg-[#1E1E1E]
                  ${isEdited ? 'text-white' : 'text-white/20'}
                  p-[10px]
                  rounded-[10px]
                  mt-[10px]
                  resize-none
                  font-sans
                  text-sm
                  focus:outline-none
                  border border-white/10
                  focus:border-white/40
                `}
              />
              <ButtonEW title={'Send'} onClick={() => console.log('Text:', value)} width={'100%'} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}



export function LinkUploaderEW({
  title,
  value,
  onChange,
  hidden,
  id,
  activeId,
  setActiveId,
  isAttach,
  titleButton,
  onClickButton,
  height = '150px',
  disclamer = "Please enter a link to the image",
  needDisclamer = false
}) {
  const isMobile = IsDetective();
  const [isOpenState, setIsOpenState] = useState(hidden);
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState;
  const [isEdited, setIsEdited] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(value);

  const isPreviewImage =
  backgroundImage &&
  backgroundImage !== "http://..." &&
  backgroundImage.length > 8 &&
  (backgroundImage.startsWith("http://") || backgroundImage.startsWith("https://"));


  useEffect(() => {
    setBackgroundImage(value);
  }, [value]);

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    if (!isEdited) {
      setIsEdited(true);
      onChange(text.slice(-1));
    } else {
      onChange(text);
    }
  };

  const getTextClass = () => (isEdited ? "text-white" : "text-white/20");

  return (
    <div className="flex w-[100%]">
      <div style={{ margin: isMobile ? marginMobile : margin }} className="flex flex-col w-[100%]">
        <div className="flex flex-row justify-between">
          {title ? (
            <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle}>
              {isOpen && (
                <>
                  <div
                    style={{
                      height: height,
                      background: isEdited
                      ? `url(${backgroundImage}) no-repeat center center / cover`
                      : "#1E1E1E",
                    }}
                    className="
                      duration-500
                      transition
                      flex
                      w-full
                      text-white/30
                      rounded-[10px]
                      justify-center
                      items-center
                      mt-[10px]
                      bg-[#1E1E1E]
                    "
                  >
                    {!isEdited && (
                      <span className="text-[14px] text-white/20">No preview</span>
                    )}
                  </div>
                  {needDisclamer == true ? <LabelEW title={disclamer} width={'100%'}/> : <></>}
                  <textarea
                    value={value}
                    onChange={handleChange}
                    rows={2}
                    className={`
                      w-full
                      bg-[#1E1E1E]
                      ${getTextClass()}
                      p-[10px]
                      rounded-[10px]
                      mt-[5px]
                      resize-none
                      font-sans
                      text-sm
                      focus:outline-none
                      border border-white/10
                      focus:border-white/40
                      mb-[0px]
                    `}
                  />

                  {titleButton && onClickButton && (
                    <ButtonEW
                      title={titleButton}
                      onClick={onClickButton}
                      width={"100%"}
                      folder={true}
                    />
                  )}
                </>
              )}
            </ShowGroupButtonEW>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ImageAndTextEW({
  title = "Upload & Prompt",
  imageValue,
  onImageChange,
  value,
  onChange,
  onSubmit,
  defaultImage,
  defaultPrompt = "Your prompt here...",
  height = "100px",
  asBase64 = true,
  id,
  activeId,
  setActiveId,
  isAttach,
  rows = 2,
  needDisclamer = false,
  disclamer = "Please upload an image how reference and enter your prompt",
  titleButton = "Generate",
  needButton = true
}) {
  const isMobile = IsDetective();
  const fileInputRef = useRef(null);
  const [isOpenState, setIsOpenState] = useState(true);
  const isOpen = isMobile || isAttach ? activeId === id : isOpenState;

  // Internal state for uncontrolled mode
  const [backgroundImage, setBackgroundImage] = useState(defaultImage || "");
  const [prompt, setPrompt] = useState(defaultPrompt || "");
  const [isEdited, setIsEdited] = useState(false);
  const hasCleared = useRef(false);

  // Controlled mode detection
  const isImageControlled = typeof imageValue !== "undefined" && typeof onImageChange === "function";
  const isPromptControlled = typeof value !== "undefined" && typeof onChange === "function";

  const displayedImage = isImageControlled ? imageValue : backgroundImage;
  const displayedPrompt = isPromptControlled ? value : prompt;

  const handleToggle = () => {
    if (isMobile || isAttach) {
      setActiveId?.(isOpen ? null : id);
    } else {
      setIsOpenState(!isOpenState);
    }
  };

  const handleFile = (file) => {
    if (!file) return;

    if (asBase64) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        isImageControlled ? onImageChange(base64) : setBackgroundImage(base64);
      };
      reader.readAsDataURL(file);
    } else {
      const blobUrl = URL.createObjectURL(file);
      isImageControlled ? onImageChange(blobUrl) : setBackgroundImage(blobUrl);
    }
  };


  const handleFileChange = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleTextClick = () => fileInputRef.current?.click();

  const handlePromptChange = (e) => {
    const text = e.target.value;
    if (!isEdited) {
      setIsEdited(true);
      hasCleared.current = true;
      isPromptControlled ? onChange(text.slice(-1)) : setPrompt(text.slice(-1));
    } else {
      isPromptControlled ? onChange(text) : setPrompt(text);
    }
  };

  const handleSubmit = () => {
    onSubmit?.({
      image: displayedImage,
      prompt: displayedPrompt
    });
  };

  return (
    <div className="flex w-full">
      <div style={{ margin: isMobile ? marginMobile : margin }} className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          <ShowGroupButtonEW title={title} value={isOpen} setFunction={handleToggle}>
            {isOpen && (
              <>
                <div
                  style={{
                    height,
                    background: displayedImage
                      ? `url(${displayedImage}) no-repeat center center / cover`
                      : "#1E1E1E"
                  }}
                  className="transition flex w-full text-white/30 rounded-[10px] justify-center text-center uppercase hover:cursor-pointer items-center mt-[10px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={handleTextClick}
                >
                  <span
                    className={`flex justify-center items-center text-[14px] rounded-full w-[30px] h-[30px] ${displayedImage ? "bg-white/80 text-black hover:bg-white/20 hover:text-white" : "bg-white/20 hover:bg-white/80 hover:text-black"}`}
                  >
                    ↑
                  </span>
                </div>

                {needDisclamer && <LabelEW title={disclamer} width={'100%'} />}

                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />

                <textarea
                  value={displayedPrompt}
                  onChange={handlePromptChange}
                  rows={rows}
                  className={`
                    w-full
                    bg-[#1E1E1E]
                    ${isEdited ? "text-white" : "text-white/20"}
                    p-[10px]
                    rounded-[10px]
                    mt-[5px]
                    mb-[5px]
                    resize-none
                    font-sans
                    text-sm
                    focus:outline-none
                    border border-white/10
                    focus:border-white/40
                  `}
                />

                {needButton && (
                  <ButtonEW title={titleButton} onClick={handleSubmit} width={'100%'} folder={true} />
                )}
              </>
            )}
          </ShowGroupButtonEW>
        </div>
      </div>
    </div>
  );
}



//////////////////////////////////////////////////////////////////////////////
// System ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


export function SplitEW({children}){
  const isMobile = IsDetective()

  return(
    <div  className={` 
    flex 
    w-[100%] 
    justify-center 
    ${isMobile ? 'pl-[21px]' : 'pl-[11px]'}
    ${isMobile ? 'pr-[21px]' : 'pr-[11px]'}
    `}>
        {children}
    </div>
  )
}

export function FolderSplitEW({children}){
  return(
    <div  className="flex w-[100%] justify-center ">
        {children}
    </div>
  )
}

// export function PreloaderEW({ run = false, onFinish }) {
//   const [seconds, setSeconds] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     let progressInterval;
//     let secondsInterval;
//     let startTime;

//     if (run) {
//       setProgress(5);
//       setSeconds(0);
//       setStatus("Generating");
//       startTime = Date.now();

//       progressInterval = setInterval(() => {
//         setProgress((prev) => {
//           const next = Math.min(95, prev + Math.random() * 2);
//           return next;
//         });
//       }, 500);

//       secondsInterval = setInterval(() => {
//         setSeconds((s) => s + 1);
//       }, 1000);
//     }

//     if (!run) {
//       clearInterval(progressInterval);
//       clearInterval(secondsInterval);
//       if (status === "Generating") {
//         const duration = ((Date.now() - startTime) / 1000).toFixed(2);
//         setStatus(`Done in ${duration}s`);
//         setProgress(100);
//         setTimeout(() => setProgress(0), 800);
//         if (onFinish) onFinish(duration);
//       }
//     }

//     return () => {
//       clearInterval(progressInterval);
//       clearInterval(secondsInterval);
//     };
//   }, [run]);

//   return (
//     <div className="w-full flex flex-col items-center">
//       {status.toLowerCase().startsWith("generating") && (
//         <div
//           className="
//             bg-white/20
//             h-[2px]
//             rounded
//             overflow-hidden
//             mt-4
//             mb-2
//             mx-5
//             w-[calc(100%-2.5rem)]
//           "
//         >
//           <div
//             className="bg-white h-[1px] transition-all duration-200"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       )}

//       {status && (
//         <p
//           className="
//             mt-1
//             font-sans
//             font-regular
//             text-[10px]
//             uppercase
//             tracking-[-0.015rem]
//             text-white/20
//             text-center
//             px-2
//           "
//         >
//           {status.toLowerCase().startsWith("generating")
//             ? `Generating (${seconds}s)...`
//             : status}
//         </p>
//       )}
//     </div>
//   );
// }



export function PreloaderEW({ run = false, onFinish }) {
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const startTimeRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const secondsIntervalRef = useRef(null);

  useEffect(() => {
    if (run) {
      setProgress(5);
      setSeconds(0);
      setStatus("Generating");
      startTimeRef.current = Date.now();

      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(95, prev + Math.random() * 2);
          return next;
        });
      }, 500);

      secondsIntervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    if (!run && status === "Generating") {
      clearInterval(progressIntervalRef.current);
      clearInterval(secondsIntervalRef.current);

      const duration = ((Date.now() - startTimeRef.current) / 1000).toFixed(2);
      setStatus(`Done in ${duration}s`);
      setProgress(100);

      // 🌟 плавное исчезновение прогресса после завершения
      setTimeout(() => {
        setProgress(0);
        if (onFinish) onFinish(duration);
      }, 800); // жди пока полоска долетит до 100%
    }

    return () => {
      clearInterval(progressIntervalRef.current);
      clearInterval(secondsIntervalRef.current);
    };
  }, [run]);

  return (
    <div className="w-full flex flex-col items-center">
      {(status.toLowerCase().startsWith("generating") || progress > 0) && (
        <div
          className="
            bg-white/20
            h-[2px]
            rounded
            overflow-hidden
            mt-4
            mb-2
            mx-5
            w-[calc(100%-2.5rem)]
          "
        >
          <div
            className="bg-white h-[1px] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {status && (
        <p
          className="
            mt-1
            font-sans
            font-regular
            text-[10px]
            uppercase
            tracking-[-0.015rem]
            text-white/20
            text-center
            px-2
          "
        >
          {status.toLowerCase().startsWith("generating")
            ? `Generating (${seconds}s)...`
            : status}
        </p>
      )}
    </div>
  );
}


////////////////////////////////////////////////////////////////////////////////
// Main Conteiner ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


export default function EwGui({
  children, 
  width, 
  data, 
  title , 
  top = 0 , 
  left=0, 
  attach, 
  rollup = false, 
  mobileHeight = 40, 
  desktopHeight = 95, 
  bottom = false,
  rounded = 24
}) {

  const isMobile = IsDetective()
  const [isBottom, setIsBottom] = useState(bottom)

  const [position, setPosition] = useState({ x: left, y: top });
  const startPosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const guiConteiner = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isRollup, setIsRollup] = useState(rollup)

  const [activeId, setActiveId] = useState(null);
  const [ isAttach, setIsAttach] = useState(attach)

  const handleSetActive = (id) => {
    setActiveId(id);
  };
  


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current && guiConteiner.current) {
        const container = guiConteiner.current;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newX = e.clientX - startPosition.current.x;
        let newY = e.clientY - startPosition.current.y;

        if (newX < 0) newX = 0;
        if (newX + container.offsetWidth > viewportWidth) {
          newX = viewportWidth - container.offsetWidth - 20;
        }

        if (newY < 0) newY = 0;
        if (newY + container.offsetHeight > viewportHeight) {
          newY = viewportHeight - container.offsetHeight - 20;
        }

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startPosition.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };


  return (
    <>
      <ComponentValueProvider>
        {isVisible && (
          <div
            id="Main Container"
            ref={guiConteiner}
            style={{
              width:  isMobile ? '95vw' : width,
              transform: `translate(${position.x}px, ${position.y}px)`,
              // paddingBottom: isRollup ? '0px' : isMobile ? '20px' : '10px',
              paddingBottom: isRollup && isMobile ? '0px' : isMobile ? '20px' : '10px',
              maxHeight: isMobile ? mobileHeight + 'vh' : desktopHeight + 'vh',
              // bottom:isBottom ? '0' : null,
              borderRadius: rounded +'px'
            }}
            className={`  
              shadow-box
              no-scrollbar
              m-[10px] 
              fixed 
              z-1000 
              flex-col 
              justify-center 
              backdrop-blur-lg
              ${isMobile ? 'bottom-0' : null}
              bg-[#181818]/80  
              min-h-[0vh] 
              overflow-y-auto
              overflow-x-hidden
              select-none
              `}>
            <div className="sticky top-0 left-0 w-full z-[100]" onClick={()=>{ isMobile ? setIsRollup(isRollup === false ? true : false) : setIsRollup(false) }}>
                <GrabButtonEW width="100%" setFunction={handleMouseDown} title={title} isMobile={isMobile} rollupStatus={isRollup} />
            </div>

            {data && (<DataEW/>)}

            {isRollup && isMobile === true ? null : 
            <>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                activeId,
                isAttach,
                setActiveId: handleSetActive,
              });
            })}
            </>
          
            }

          </div>
        )}
      </ComponentValueProvider>
    </>
  );
}







