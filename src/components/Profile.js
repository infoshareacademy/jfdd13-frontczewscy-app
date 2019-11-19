import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import styles from "./Profile.module.css";



const CardExampleImageCard = () => (
    <div className={styles.container}>
    <Card className={styles.card}>
      <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Kajetan Kowalski</Card.Header>
        <Card.Meta>Joined in 2019</Card.Meta>
        <Card.Description>
            Nie będę się reklamował. 
            Nie lubię pisać o sobie, trzeba mnie poznać.
            Jestem miłym i normalnym facetem mającym swoje pasje.
            W polu „wymarzona partnerka” pustka.
            Nie ma ideałów...
            Jak znajdę to będę wiedział...
            Szukam kobiety, która mnie zrozumie.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='comment' />
          10 Comments
        </a>
      </Card.Content>
    </Card>
    </div>
  )

//   const RandomProfile = () => (
//     <div class="ui card">
//     <div class="image">
//       <img src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />
//     </div>
//     <div class="content">
//       <div class="header">Daniel</div>
//       <div class="meta">Joined in 2016</div>
//       <div class="description">Daniel is a comedian living in Nashville.</div>
//     </div>
//     <div class="extra content">
//       <a>
//         <i aria-hidden="true" class="user icon"></i>
//         10 Friends
//       </a>
//     </div>
//   </div>
//   )
  



  export default CardExampleImageCard