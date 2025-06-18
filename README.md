# Getting Started with Endless Gui
```bash
npm i endlessgui
```


![EwGui Logo](https://ewgui.vercel.app/images/logo.png)


#### Components:

| Component | Props                  | Description | 
| :-------- | :----------------------| :---------  |
| `HeaderEW`  | title  | Label for the name of your project	| 
| `LabelEW`   | title  | Label for the name of one or a group of controls |
| `SliderEW` | title, min, max, step, value, onChange   | Classic Range input   | 
| `ButtonEW`  | title, onClick  | Button |
| `TogglerEW`  | title_a, title_b, onClick_a, onClick_b  | Slider between two states  | 
| `DropdownEW`  |  items, onSelect | Drop-down list |
| `RadioEW`  |  title_a, title_b, onClick | Radio button |
| `UniversalUploaderEW` |  onImageLoaded, onFileLoaded, hidden, | Drag and drop field for uploading files such as jpeg, png, fbx, obj, pdf |
| `ImageUploaderEW` |  onImageLoaded hidden,  | Drag and drop field for loading jpeg, png | 
| `ColorPickerEW`|  WIP | Color palette can be selected by cursor or typed in  |




### Basic import:
```jsx
import EwGui, { ButtonEW, LabelEW, HeaderEW, SliderEW ... } from "./components/ewGui";
```


# Simple example:
```jsx

export function App(){

  const [slider, setSlider] = useState(0)
  const [urlFile, setUrlFile] = useState(null)

  const itemsGui = [
    { label: 'First', value: '1' },
    { label: 'Second', value: '2' },
    { label: 'Third', value: '3' },
  ]
  
  const [ dropdown, setDropdown] = useState(itemsGui[0])
  
  const handleDropdown = (item) => {
    setDropdown(item);
  };

  const handleButtonEvent = ()=>{
    console.log('EwGui is work')
  }

  return(
    <>
      <EwGui width={'300px'}>
        <HeaderEW title={'Test GUI'}/>
        <SliderEW title={'SLider'} min={0} max={1} step={0.1} value={slider} onChange={setSlider} />
        <DropdownEW items={itemsGui} onSelect={handleDropdown}/>
        <UniversalUploaderEW onImageLoaded={setImage} onFileLoaded={setUrlFile} hidden={false}/>
        <ButtonEW title={'Save'} onClick={handleButtonEvent}/>
        ...
      </EwGui>
    </>
  )
}
```

# Components UI

### `HeaderEW` 

  ```jsx
  <HeaderEW title={}/>
  ```
  ```jsx
  /** Use props */
  title={'Endless Work Gui'} 
  ```

### `LabelEW` 

  ```jsx
  <LabelEW title={}/>
  ```
  ```jsx
  /** Use props */
  title={'Color mode'} 
  ```

### `SliderEW` 

  ```jsx
  <SliderEW title={} min={} max={} step={} value={} onChange={} />
  ```
  ```jsx
   /** Add value & event */
  const [slider, setSlider] = useState(0)

  /** Use props */
  title={'Slider'} 
  min={0} 
  max={10} 
  step={0.01} 
  value={slider} 
  onChange={setSlider}
  ```

### `ButtonEW` 
  ```jsx
   <ButtonEW title={'Hello'} onCLick={()=>alert('Hello world')} width={'100%'}/>
  ```

  ```jsx
  /** Use props */
  title={'Button'} 
  onCLick={()=>{}} 
  width={'100%'}
  ```
### `TogglerEW` 

  ```jsx
   <TogglerEW title_a={} title_b={} onClicke_a={} onClicke_b={}/>
  ```

  ```jsx
  /** Use props */
  title_a={'On'}  /** first state */
  title_b={'Off'}  /** second state */
  onClicke_a={()=>{}}  /** first event */
  onClicke_b={()=>{}} /** second event */
  ```

### `DropdownEW` 
  ```jsx
   <DropdownEW items={} onSelect={}/>
  ```

  ```jsx
  /** Add value, array & event */
  const itemsGui = [
    { label: 'First', value: '1' },
    { label: 'Second', value: '2' },
    { label: 'Third', value: '3' },
  ]
  const [ dropdown, setDropdown] = useState(itemsGui[0])
  
  /** The first one in the list will be displayed first */
  const handleDropdown = (item) => {
    setDropdown(item);
  };

  /** Use props */
  items={itemsGui} 
  onSelect={handleDropdown}
  ```


### `RadioEW` 
  ```jsx
  <RadioEW title_a={} title_b={} onCLick={}/>
  ```

  ```jsx
  /** Use props */
  title_a={'On'}  /** first state */
  title_b={'Off'}  /** second state */
  onClicke_a={()=>{}}  /** first event */
  ```

### `UniversalUploaderEW` 

  ```jsx
  <UniversalUploaderEW onImageLoaded={} onFileLoaded={} hidden={}/>
  ```

  ```jsx
   /** Add value & event */
  const [image, setImage] = useState(null)
  const [urlFile, setUrlFile] = useState(null)

  /** Use props */
  onImageLoaded={setImage} 
  onFileLoaded={setUrlFile} 
  hidden={false} /** if false drag & drop field hide */
  ```

### `ImageUploaderEW` 

  ```jsx
  <ImageUploaderEW onImageLoaded={} hidden={}/>
  ```

  ```jsx
   /** Add value & event */
  const [image, setImage] = useState(null)

  /** Use props */
  onImageLoaded={setImage} 
  hidden={false} /** if false drag & drop field hide */
  ```


### `ColorPickerEW`

 `work in progress`





