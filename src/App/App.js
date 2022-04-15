import React, { Component } from "react";
import FlexHLayout from "./components/layout/FlexHLayout/FlexHLayout";
import FlexWLayout from "./components/layout/FlexWLayout/FlexWLayout";
import Navbar from "./components/ui/Navbar/Navbar";
import "./App.css";
import MemeViewer from "./components/ui/MemeViewer/MemeViewer";
import MemeForm from "./components/functionnal/MemeForm/MemeForm";
import { ACTIONS_CURRENT, store } from "./store/store";
import { DummyMeme } from "./interfaces/common";
import MemeThumbnail from "./components/functionnal/MemeThumbnail/MemeThumbnail";
import { Routes, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      memes: [],
    };
  }
  componentDidMount() {
    this.setState({
      images: store.getState().ressources.images,
      memes: store.getState().ressources.memes,
    });
    store.subscribe(() => {
      this.setState({
        images: store.getState().ressources.images,
        memes: store.getState().ressources.memes,
      });
    });
  }
  render() {
    // console.log(store)
    return (
      <div className="App" style={{ height: "95vh" }}>
        <FlexHLayout>
          <Navbar />
          <Routes>
            <Route path="/" element={<div>Home</div>}/>
            <Route path="/thumbnail" element={<MemeThumbnail
                memes={this.state.memes}
                images={this.state.images}
              />}/>
            <Route path="/editor" element={
              <FlexWLayout>
                <MemeViewer/>
                <MemeForm/>
              </FlexWLayout>}/>
          </Routes>
          <div className="footer" style={{ textAlign: "center" }}>
            Copyright &copy; DESORBAIX
          </div>
        </FlexHLayout>
      </div>
    );
  }
}

export default App;
