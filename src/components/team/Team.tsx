import React from 'react';
import { TEAM_DATA } from '../../constants/const';
import cl from './Team.module.scss';
import githubLogo from '../../assets/image/github-logo.png';

function Team() {
  return (
    <div className={cl.container}>
      <div className={cl.team}>
        {TEAM_DATA.map(({ name, image, role, github }) => {
          return (
            <div className={cl.teamItem} key={name}>
              <div className={cl.img}>
                <img className={cl.imgImg} src={image} alt="img" />
              </div>
              <div className={cl.content}>
                <div className={cl.name}>
                  {name}
                  <a className={cl.github} href={github} target="_blank" rel="noreferrer">
                    <img src={githubLogo} alt="github" />
                  </a>
                </div>
                <div className={cl.role}>{role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Team;
