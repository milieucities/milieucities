import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const NoumeaShareButtons = (props) => {
    const {isMobile} = props;

    return (
        <div className="row">
          <div className="col-xs-3 col-md-4 icons">
            { isMobile &&
              <img
                src={require(`./images/theme-immediat.svg`)}
                width="45px"
                height="45px"
             />
            }
            {
              !isMobile &&
              <img
                src={require(`./images/theme-immediat.svg`)}
                width="85px"
                height="85px"
             />
            }
            <FacebookShareButton
              url="/participez"
              title="Un projet collaboratif de concertation citoyenne pour la nouvelle entrée nord du centre-ville de Nouméa"
              media={require(`./images/theme-immediat.svg`)}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            
            <TwitterShareButton
              url="/participez"
              title="Un projet collaboratif de concertation citoyenne pour la nouvelle entrée nord du centre-ville de Nouméa"
              media={require(`./images/theme-immediat.svg`)}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            
            <a href="mailto:webmaster@example.com">
              <i className="fa fa-envelope-o fa-2x" aria-hidden="true"></i>
            </a>
          </div>
        </div>
    )
}

export default NoumeaShareButtons;