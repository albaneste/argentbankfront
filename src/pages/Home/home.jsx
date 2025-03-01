import Banner from "../../components/Banner/Banner";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Navbar/Nav";
import Chat from "../../assets/icon-chat.png";
import Money from "../../assets/icon-money.png";
import Security from "../../assets/icon-security.png";
import "./home.css";

const homeFeatures1 = [
    {
        icon: Chat,
        title: "You are our #1 priority",
        description:
            "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
];

const homeFeatures2 = [
    {
        icon: Money,
        title: "More savings means higher rates",
        description: "The more you save with us, the higher your interest rate will be!",
    },
];

const homeFeatures3 = [
    {
        icon: Security,
        title: "Security you can trust",
        description:
            "We use top of the line encryption to make sure your data and money is always safe.",
    },
];

const Home = () => {
    return (
        <>
            <Nav />
            <Banner />
            <div className="home-features">
                <Features featuresData={homeFeatures1} />
                <Features featuresData={homeFeatures2} />
                <Features featuresData={homeFeatures3} />
            </div>
            <Footer />
        </>
    );
};

export default Home;
