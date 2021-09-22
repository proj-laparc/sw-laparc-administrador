import React, { useState } from 'react';

import { Container, Button, SubOptions, SubOption } from './styles';
import { icons } from '../../assets';

export default function SideBarOption({
  title,
  icon,
  route,
  fill,
  stroke,
  active,
  subOptions,
  activeSubOption,
}) {
  const [showSubOptions, setShowSubOptions] = useState(active);
  return (
    <Container>
      <div
        onMouseEnter={() => setShowSubOptions(true)}
        onMouseLeave={() => setShowSubOptions(active)}
      >
        <Button
          showSubOptions={showSubOptions}
          subOptions={subOptions}
          icon={icon}
          to={route}
          style={{ textDecoration: 'none' }}
          fill={fill}
          stroke={stroke}
          active={active}
        >
          {icons[icon]}
          <h1>{title}</h1>
        </Button>
        {showSubOptions && subOptions && (
          <SubOptions>
            {subOptions.map(subOption => (
              <SubOption
                key={subOption.id.toString()}
                active={activeSubOption === subOption.name}
                to={subOption.route}
              >
                <h2>{subOption.title}</h2>
              </SubOption>
            ))}
          </SubOptions>
        )}
      </div>
    </Container>
  );
}
