import http from "http";
import path from "path";
import express from "express";

const port: number = 3000;

class App {
  private server: http.Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
    const app = express();
    app.use(express.static(path.join(__dirname, "../client")));
    app.use(
      "/build/three.module.js",
      express.static(
        path.join(__dirname, "../../node_modules/three/build/three.module.js")
      )
    );
    app.use(
      "/jsm/controls/OrbitControls",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/controls/OrbitControls.js"
        )
      )
    );
    app.use(
      "/jsm/libs/stats.module",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/libs/stats.module.js"
        )
      )
    );
    app.use(
      "/jsm/libs/dat.gui.module",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/libs/dat.gui.module.js"
        )
      )
    );
    app.use(
      "/jsm/controls/OrbitControls",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/controls/OrbitControls.js"
        )
      )
    );
    app.use(
      "/jsm/controls/TrackballControls",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/controls/TrackballControls.js"
        )
      )
    );
    app.use(
      "/jsm/controls/PointerLockControls",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/controls/PointerLockControls.js"
        )
      )
    );
    app.use(
      "/jsm/controls/DragControls",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/controls/DragControls.js"
        )
      )
    );
    app.use(
      "/jsm/controls/TransformControls",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/controls/TransformControls.js"
        )
      )
    );

    this.server = new http.Server(app);
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`);
    });
  }
}

new App(port).Start();
