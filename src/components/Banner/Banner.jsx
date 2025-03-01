import BannerImg from '../../assets/bank-tree.jpeg';
import './banner.css';

const Banner = () => {
    return (
        <div className="banner">
            <img className="banner-image" src={BannerImg} alt="Bank tree" />
            <div className="banner-content">
                <p className="banner-subtitle">
                    No fees.
                </p>
                <p className="banner-subtitle">
                    No minimum deposit.
                </p>
                <p className="banner-subtitle">
                    High interest rates.
                </p>
                <p className="banner-txt">
                    Open a savings account with Argent Bank today!
                </p>
            </div>
        </div>
    );
};

export default Banner;