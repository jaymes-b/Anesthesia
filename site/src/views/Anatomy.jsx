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
        <Card 
          imageUrl={"https://prod-images-static.radiopaedia.org/images/133697/86c1f2821cf7b547d33ecd2f55f94e_jumbo.jpg"}
          bodyPart={"shoulder"}
        />
        <Card 
          imageUrl={"https://i0.wp.com/blog.clinicalmonster.com/wp-content/uploads/sites/3/2015/02/forearm1.png"}
          bodyPart={"arm"}
        />
        <Card 
          imageUrl={"https://prod-images-static.radiopaedia.org/images/2089213/f12063879a29e672f675977fabdc89_gallery.jpeg"}
          bodyPart={"chest"}
        />
        <Card 
          imageUrl={"https://prod-images-static.radiopaedia.org/images/8011971/de0f7a7fa8561dc31e023e21a554a3_gallery.jpg"}
          bodyPart={"foot"}
        />
      </div>
      <Navbar activePage={"anatomy"}/>
    </div>
  )
}

export default Anatomy