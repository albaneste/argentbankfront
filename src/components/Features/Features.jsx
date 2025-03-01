import "./features.css";

const Features = ({ featuresData }) => {
  return (
    <section className="features">
      {featuresData.map((feature, index) => (
        <div className="feature-item" key={index}>
          <img src={feature.icon} alt={`${feature.title} Icon`} className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;