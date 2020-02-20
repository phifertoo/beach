import React from "react";

export default function Hero({ children, hero }) {
  return (
    <div>
      <header className={hero}>{children}</header>
      {/*the defaultHero prop is passed into this component
      as an argument from the Home component(parent) */}
    </div>
  );
}

Hero.defaultProps = {
  hero: "defaultHero"
};

/*if no prop is passed into the hero argument, the value of
hero will be 'defaultHero. This is used for the error page.  */
