const Notification=({message})=>
{
  if(message===''){return null}

  if(message.includes('Wrong')|| message.includes('ERROR')){
  return (
    <div className='error' id = 'err'>
      {message}
    </div>
  )
  }
  else{
    return (
      <div className='add'>
        {message}
      </div>
    )
  }
}
export default Notification