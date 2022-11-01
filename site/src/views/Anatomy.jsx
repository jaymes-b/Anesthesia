import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import './Anatomy.css';

const Anatomy = () => {
  return (
    <div>
      <div className="anatomy-gallery">
        <Card 
          imageUrl={"https://prod-images-static.radiopaedia.org/images/12509516/a4888249bacb0ebacd0fa7be38fd38_jumbo.jpg"}
          bodyPart={"leg"}
        />
        <Card 
          imageUrl={"https://radsource.us/wp-content/uploads/2019/10/1C.jpg"}
          bodyPart={"hip"}
        />
        <Card 
          imageUrl={"https://prod-images-static.radiopaedia.org/images/10859219/0e752ba4d814a25093289fd2b58782_jumbo.jpg"}
          bodyPart={"abdomen"}
        />
        <Card 
          imageUrl={"https://prod-images-static.radiopaedia.org/images/53184924/2945667385191d66440188d5436a8a_jumbo.jpeg"}
          bodyPart={"hand"}
        />
      </div>
      <Navbar activePage={"anatomy"}/>
    </div>
  )
}

export default Anatomy