import React from 'react';
import { Card, Image } from 'semantic-ui-react'
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
        
      </Card.Content>
    </Card>
    </div>
  )




  export default CardExampleImageCard