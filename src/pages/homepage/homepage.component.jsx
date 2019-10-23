import React from "react";

import { Row, Col, Icon, Spin } from "antd";
import FontCard from "../../components/font-card/font-card.component";

import "antd/dist/antd.css";
import "./homepage.styles.scss";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchFontsField: "",
      inputWordField: "Then came the night of the first falling start.",
      fontSize: "32",
      darkModeToggle: false,
      grideViewToggle: false,
      fontsArray: [],
      isLoading: false,
      cardMd: 6,
      cardLg: 6,
      cardXl: 6
    };
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  reloadPage = () => {
    this.setState({
      searchFontsField: "",
      inputWordField: "Then came the night of the first falling start.",
      fontSize: "32",
      darkModeToggle: false,
      grideViewToggle: false
    });
  };

  toggleGrid = () => {
    const { grideViewToggle } = this.state;
    if (grideViewToggle) {
      this.setState({
        cardMd: 6,
        cardLg: 6,
        cardXl: 6,
        grideViewToggle: !grideViewToggle
      });
    } else if (!grideViewToggle) {
      this.setState({
        cardMd: 24,
        cardLg: 24,
        cardXl: 24,
        grideViewToggle: !grideViewToggle
      });
    }
  };

  handleChange = async event => {
    const { name, value } = await event.target;
    await this.setState({
      [name]: value
    });
    if (this.state.inputWordField.length === 0)
      await this.setState({
        inputWordField: "Then came the night of the first falling start."
      });
  };

  componentDidMount() {
    try {
      this.setState({ isLoading: true });
      fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyB4bp5OGaQ1rbXUhJhn5b78kgAO0f5z3Wo`
      )
        .then(response => response.json())
        .then(result =>
          this.setState({ fontsArray: result.items, isLoading: false })
        );
    } catch (error) {
      console.log("Error: ", error);
      alert("An error occurred, Please try again");
    }
  }
  render() {
    const {
      darkModeToggle,
      grideViewToggle,
      fontsArray,
      fontSize,
      inputWordField,
      searchFontsField,
      isLoading,
      cardMd,
      cardLg,
      cardXl
    } = this.state;
    console.log();
    const filteredFontArray = fontsArray.filter(font =>
      font.family.toLowerCase().includes(searchFontsField.toLowerCase())
    );
    return (
      <div className="home-page">
        <div className="input-function">
          <form className="input-form" onSubmit={this.handleSubmit}>
            <Row style={{ borderRadius: "3rem" }}>
              <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                <input
                  autoComplete="off"
                  onChange={this.handleChange}
                  className="input-row__input"
                  name="searchFontsField"
                  type="search"
                  placeholder="Search fonts"
                />
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={7}
                xl={7}
                style={{ borderLeft: "1px solid black" }}
              >
                <input
                  autoComplete="off"
                  onChange={this.handleChange}
                  className="input-row__input"
                  name="inputWordField"
                  type="search"
                  placeholder="Type Something"
                />
              </Col>
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={2}
                xl={2}
                style={{ borderLeft: "1px solid black" }}
              >
                <select
                  defaultValue="32"
                  onChange={this.handleChange}
                  name="fontSize"
                  className="input-row__select select-font"
                >
                  <option value="20">20px</option>
                  <option value="24">24px</option>
                  <option value="32">32px</option>
                  <option value="40">40px</option>
                </select>
              </Col>
              <Col xs={6} sm={6} md={6} lg={2} xl={2}>
                {!darkModeToggle ? (
                  <button className="mode-toggle mode-toggle__dark"></button>
                ) : (
                  <button className="mode-toggle mode-toggle__white"></button>
                )}
              </Col>
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={2}
                xl={2}
                onClick={() => this.toggleGrid()}
              >
                {grideViewToggle ? (
                  <Icon className="input-row__icon" type="table" />
                ) : (
                  <Icon className="input-row__icon" type="unordered-list" />
                )}
              </Col>
              <Col xs={6} sm={6} md={6} lg={2} xl={2}>
                <button className="reset-button" type="reset">
                  <Icon
                    onClick={() => this.reloadPage()}
                    className="input-row__icon"
                    type="reload"
                  />
                </button>
              </Col>
            </Row>
          </form>
        </div>
        {/* END OF INPUT FUNCTION */}
        <section className="main-section">
          <Row gutter={[16, 16]}>
            {!isLoading ? (
              filteredFontArray
                .filter((item, idx) => idx < 50)
                .map((font, index) => (
                  <FontCard
                    key={index}
                    family={font.family}
                    category={font.category}
                    size={fontSize}
                    text={inputWordField}
                    cardMd={cardMd}
                    cardLg={cardLg}
                    cardXl={cardXl}
                  />
                ))
            ) : (
              <Spin />
            )}
          </Row>
        </section>
        <footer className="footer">
          <p>Made by Josh | 2019 | Chingu Pre-Work Project</p>
        </footer>
      </div>
    );
  }
}

export default HomePage;
