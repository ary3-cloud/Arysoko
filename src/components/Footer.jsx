import React from 'react'

const Footer = () => {
  return (
    <div className='row bg-info'>
      <div className='col-md-4 text-center'>
        <h2>About Us</h2>
        <p>We are offer quality products located localy.Arynest is all about one's talent and capabilities</p>
        <p>We have monthly workshops that is available for everyone inrested in joinig to grow and learn new thigngs from each other.</p>

      </div>

      <div className='col-md-4 text-center'>
        <h2>Contuct Us</h2>
        <form action="">
          
          <input type="email" placeholder='Enter your email'className='form-control'/>
          <br /><br />
          <textarea name="" id=""className='form-control'
          placeholder='leave a comment'></textarea>
          <br /><br />

          <input type="submit" className='btn btn-outline-primary' value="Send message"/>
        </form>



      </div>

      <div className='col-md-4 text-center'>
        <h2>Stay Connected</h2>
        <a href="https://www.facebook.com" target="_blank"> <img src="images/fb.png" alt="" /></a>

        <a href="https://www.instagram.com" target="_blank"><img src="images/in.png" alt="" /></a>

        <a href="https://www.x.com" target="_blank"><img src="images/x.png" alt="" /></a>
        <br />
        <p>To stay connected and updated one can follow us on our social media platforms.Don't miss ur chance of getting updated with our newest and greatest hits.</p>

      </div>

       
      



    </div>
  
 




  )
}

export default Footer