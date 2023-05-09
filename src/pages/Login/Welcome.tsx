import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Welcome = () => {
  return (
    <Card sx={{ width: "50%", margin: "1em auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={require("../../images/building.JPG")}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Лесто-Инфор ERP extension
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Добре дошли в нашата надградена ERP система! Радваме се, че сте с
            нас днес. Новият софтуер предлага още по-голяма ефективност и
            функционалност, за да ви помогне да управлявате и анализирате
            по-лесно и ефективно. Ние сме уверени, че ще се възползвате от
            новите възможности и ще откриете, че работата с ERP системата е
            по-удобна и интуитивна. С extension-а на система вие ще можете да
            следите и управлявате всички аспекти на бизнеса - от продажби и
            финанси до складово управление и производство. Системата ви дава
            инструменти, за да направите по-добри решения, ускорите процесите и
            увеличите печалбата. Благодарим ви, че избрахте нашия ERP extension
            и се надяваме, че ще имате положителен и продуктивен опит с нея. Ако
            имате въпроси или нужда от помощ, не се колебайте да се свържете с
            нас. Желаем ви успешна работа с нашия софтуер!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Welcome;
