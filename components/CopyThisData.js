export async function copyContent(text) {
  try {
    return await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export default function CopyThisData(divId){
  const divText = document.getElementById(divId).innerText
  copyContent(divText)
}