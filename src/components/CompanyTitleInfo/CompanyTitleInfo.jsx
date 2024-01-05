import React, { useEffect, useState } from 'react';
import css from './CompanyTitleInfo.module.css';
import formCss from '../../assets/styles/form.css';
import {Link, useParams} from "react-router-dom";
import { Button } from "@mui/material";
import {companyService} from "../../services";
import {baseURL, imgLink} from "../../constants";
import logoImg from "../../assets/img/rest-bg.jpg";
import logoInst from "../../assets/img/icon-inst.svg";
import logoFb from "../../assets/img/icon-fb.svg";

const CompanyTitleInfo = () => {
    const [companyData, setCompanyData] = useState(null);
    const { companyLink } = useParams();
    console.log(companyLink);
    useEffect(() => {
        console.log(`${baseURL}/${companyLink}`);

        companyService.getAll(`${baseURL}/${companyLink}`)
            .then(response => {
                setCompanyData(response.data.companyInfo);
                console.log(response.data.companyInfo);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);
    if (!companyData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/*TODO интегрировать карту, адаптивность!*/}
           <div className={css.grid}>
               {/*logo full screen 1*/}
               <div className={css.gridItem}>
                   <div className={css.logoWrap}>
                       <div className={css.logoWrapInner}>
                           <div className={css.logo} style={{backgroundImage: `url(${imgLink}${companyData.img})`}}></div>
                           {/*<img src={`${imgLink}${companyData.img}`} alt={'companyLogo'} className={css.companyLogo} />*/}
                       </div>
                   </div>
               </div>

               {/*companyData 2 */}
               <div className={css.gridItem}>
                   <h1 className={css.title}>{companyData.name}</h1>
                   <div className={css.descrShort}>{companyData.title}</div>
                   <div className={css.descrLong}>{companyData.description}</div>
               </div>

               {/*menu btn 3 */}
               <div className={css.gridItem}>
                   {/*<h3 className={css.menuTitle}>Menu:</h3>*/}

                   <div className={css.menuBtnWrap}>
                       <Link to={`menu`} className={css.btnWrap} >
                           <Button className={css.btn} size="large" variant="contained" color="success">Open specials</Button>
                       </Link>
                       <Link to={`menu`} className={css.btnWrap} >
                           <Button className={css.btn} size="large" variant="outlined" color="success">Food</Button>
                       </Link>

                       <Link to={`menu`} className={css.btnWrap} >
                           <Button className={css.btn} size="large" variant="outlined" color="success">Drinks</Button>
                       </Link>
                   </div>
               </div>

               {/*contacts full screen 4*/}
               <div className={css.gridItem}>
                   <section className={css.contacts}>
                       <div className={css.contactsItem}>
                           <div className={css.contactsTitle}>address:</div>
                           <div className={css.contactsValue}>{companyData.address}</div>
                       </div>
                       <div className={css.contactsItem}>
                           <div className={css.contactsTitle}>contact phone:</div>
                           <div className={css.contactsValue}>{companyData.phone}</div>
                       </div>
                   </section>
               </div>

               {/*Social media 5*/}
               <div className={css.gridItem}>
                   <section className={css.socialWrap}>
                       <h3>Social media:</h3>
                       {companyData.instagram &&
                           <div className={css.socialItem}>
                               <img className={css.socialIcon} src={logoInst} alt="Instagram"/>
                               <a href={companyData.instagram} target="_blank">Instagram</a>

                           </div>
                       }
                       {companyData.faceBook &&
                           <div className={css.socialItem}>
                               <img className={css.socialIcon} src={logoFb} alt="FaceBook"/>
                               <a href={companyData.faceBook} target="_blank">FaceBook</a>
                           </div>
                       }
                   </section>

               </div>

               {/*map full screen 6*/}
               <div className={css.gridItem}>
                   <iframe
                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.6302063066987!2d18.84041427659977!3d42.28641653975014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134dd49b2986498d%3A0xc8aae77457e5e2e3!2sHedone!5e0!3m2!1suk!2sua!4v1704308364688!5m2!1suk!2sua"
                       className={css.map}  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                   {/*<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1705.0914540907177!2d18.844744789388198!3d42.28625091372507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134dd484891d3c9d%3A0xbfaae870e4704a7!2sHotel%20Slovenska%20Pla%C5%BEa!5e0!3m2!1suk!2sua!4v1704235932356!5m2!1suk!2sua" */}
                   {/*width="400" height="300" style="border:0;" allowFullScreen="" loading="lazy"*/}
                   {/*     referrerPolicy="no-referrer-when-downgrade"></iframe>    */}
                   {/*<iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${companyData.area}!${companyData.LONGITUDE}!${companyData.LATITUDE}`} width="400" height="300" style="border:0;" allowFullScreen="" loading="lazy"*/}
                   {/*     referrerPolicy="no-referrer-when-downgrade"></iframe>*/}
               </div>
           </div>
        </>
    );
};

export { CompanyTitleInfo };


