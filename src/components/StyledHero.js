import styled from "styled-components";
import defaultImg from "../images/room-1.jpeg";

const StyledHero = styled.header`
  min-height: 60vh;
  background: url(${props =>
      props.img !== undefined ? props.img : defaultImg})
    center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/* if the img props is passed in, render the
img. If the img props is not passed in, render
the default image.*/

export default StyledHero;
