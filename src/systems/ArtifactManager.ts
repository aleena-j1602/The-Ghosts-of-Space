
import {
  Scene,
  TransformNode,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Vector3,
  Mesh,
} from '@babylonjs/core';

import type { ArtifactDefinition } from '../data/artifacts/Core/artifactTypes.ts';
import { ARTIFACTS_DATA } from '../data/artifacts/index.ts';

export class ArtifactManager {
  private scene: Scene;

  public artifacts: ArtifactDefinition[] = [];

  public artifactMeshes: Map<string, TransformNode> = new Map();

  private beaconRings: Map<string, Mesh> = new Map();

  private collectedArtifacts: Set<string> = new Set();

  private elapsedTime = 0;

  public level: number = 1;

  private artifactPositions: Record<string, Vector3> = {
    // Level 1: Moon (Mare Tranquillitatis & Hadley)
    'a11-lm5-descent': new Vector3(32, 0, 22),
    'a12-lm6-ascent': new Vector3(-28, 0, 32),
    'a15-lm10-ascent': new Vector3(14, 0, -38),

    // Level 2: Mars (Chryse Planitia, Ares Vallis & Gusev Crater)
    'viking-1-lander': new Vector3(34, 0, 24),
    'sojourner': new Vector3(-28, 0, 30),
    'spirit': new Vector3(16, 0, -36),
  };

  constructor(scene: Scene, level: number = 1) {
    this.scene = scene;
    this.level = level;

    // Load artifacts filtered by current level.
    this.artifacts = Object.values(ARTIFACTS_DATA).filter(
      (artifact) => artifact.level === this.level
    );

    this.spawnArtifacts();
  }

  // -------------------------------------------------------------------------
  // SPAWN ARTIFACTS
  // -------------------------------------------------------------------------

  private spawnArtifacts(): void {
    this.artifacts.forEach((artifact) => {
      const rootNode = this.buildArtifact(artifact);
      const position = this.getArtifactPosition(artifact.id);

      rootNode.position = position;

      this.artifactMeshes.set(artifact.id, rootNode);

      this.createBeacon(artifact, position);
    });
  }

  public getArtifactPosition(id: string): Vector3 {
    if (this.artifactPositions[id]) {
      return this.artifactPositions[id];
    }
    const mesh = this.artifactMeshes.get(id);
    if (mesh) return mesh.position;
    return new Vector3(0, 0, 0);
  }

  private buildArtifact(artifact: ArtifactDefinition): TransformNode {
    const identity = `${artifact.id} ${artifact.commonName} ${artifact.officialName}`
      .toLowerCase();

    // Moon artifacts
    if (
      identity.includes('eagle') ||
      identity.includes('lm-5') ||
      identity.includes('lm5') ||
      identity.includes('descent stage') ||
      artifact.id === 'a11-lm5-descent'
    ) {
      return this.buildApollo11Eagle();
    }

    if (
      identity.includes('alsep') ||
      identity.includes('intrepid') ||
      identity.includes('lm-6') ||
      identity.includes('lm6') ||
      artifact.id === 'a12-lm6-ascent'
    ) {
      return this.buildALSEP();
    }

    if (
      identity.includes('rover') && (identity.includes('lunar') || identity.includes('lrv') || identity.includes('falcon') || identity.includes('apollo 15')) ||
      artifact.id === 'a15-lm10-ascent'
    ) {
      return this.buildLunarRover();
    }

    // Mars artifacts
    if (
      identity.includes('viking') ||
      artifact.id === 'viking-1-lander'
    ) {
      return this.buildVikingLander();
    }

    if (
      identity.includes('sojourner') ||
      artifact.id === 'sojourner'
    ) {
      return this.buildSojournerRover();
    }

    if (
      identity.includes('spirit') ||
      identity.includes('mer-a') ||
      artifact.id === 'spirit'
    ) {
      return this.buildSpiritRover();
    }

    return this.buildGenericArtifact(artifact);
  }

  // -------------------------------------------------------------------------
  // GENERIC ARTIFACT MODEL
  // -------------------------------------------------------------------------

  private buildGenericArtifact(
    artifact: ArtifactDefinition
  ): TransformNode {
    const root = new TransformNode(
      `artifact_${artifact.id}`,
      this.scene
    );

    const material = new StandardMaterial(
      `artifactMaterial_${artifact.id}`,
      this.scene
    );

    material.diffuseColor = new Color3(0.65, 0.7, 0.78);
    material.specularColor = new Color3(0.4, 0.4, 0.45);

    const body = MeshBuilder.CreateBox(
      `artifactBody_${artifact.id}`,
      {
        width: 2,
        height: 1.5,
        depth: 2,
      },
      this.scene
    );

    body.position.y = 1;
    body.material = material;
    body.parent = root;

    return root;
  }

  // -------------------------------------------------------------------------
  // APOLLO 11 EAGLE DESCENT STAGE
  // -------------------------------------------------------------------------

  private buildApollo11Eagle(): TransformNode {
    const root = new TransformNode(
      'apollo11_eagle_root',
      this.scene
    );

    const goldMat = new StandardMaterial(
      'eagleGoldMat',
      this.scene
    );

    goldMat.diffuseColor = new Color3(0.95, 0.75, 0.15);
    goldMat.specularColor = new Color3(1, 0.9, 0.3);

    const blackFoilMat = new StandardMaterial(
      'eagleBlackFoil',
      this.scene
    );

    blackFoilMat.diffuseColor = new Color3(0.1, 0.1, 0.12);

    const metalMat = new StandardMaterial(
      'eagleMetalMat',
      this.scene
    );

    metalMat.diffuseColor = new Color3(0.3, 0.32, 0.38);

    // Octagonal descent stage.
    const base = MeshBuilder.CreateCylinder(
      'eagleBase',
      {
        height: 1.6,
        diameter: 4.8,
        tessellation: 8,
      },
      this.scene
    );

    base.position.y = 1;
    base.material = goldMat;
    base.parent = root;

    // Descent engine bell.
    const bell = MeshBuilder.CreateCylinder(
      'eagleEngineBell',
      {
        height: 1.2,
        diameterTop: 0.8,
        diameterBottom: 1.4,
        tessellation: 16,
      },
      this.scene
    );

    bell.position.y = 0.5;
    bell.material = blackFoilMat;
    bell.parent = root;

    // Four landing struts and footpads.
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const strutDistance = 3.2;

      const strut = MeshBuilder.CreateCylinder(
        `eagleStrut_${i}`,
        {
          height: 2.6,
          diameter: 0.18,
        },
        this.scene
      );

      strut.position = new Vector3(
        Math.cos(angle) * (strutDistance * 0.5),
        0.8,
        Math.sin(angle) * (strutDistance * 0.5)
      );

      strut.rotation.z = Math.cos(angle) * 0.5;
      strut.rotation.x = -Math.sin(angle) * 0.5;
      strut.material = goldMat;
      strut.parent = root;

      const pad = MeshBuilder.CreateCylinder(
        `eaglePad_${i}`,
        {
          height: 0.12,
          diameter: 0.85,
          tessellation: 12,
        },
        this.scene
      );

      pad.position = new Vector3(
        Math.cos(angle) * strutDistance,
        0.06,
        Math.sin(angle) * strutDistance
      );

      pad.material = metalMat;
      pad.parent = root;
    }

    // Forward ladder.
    const ladder = MeshBuilder.CreateBox(
      'eagleLadder',
      {
        width: 0.45,
        height: 1.8,
        depth: 0.1,
      },
      this.scene
    );

    ladder.position = new Vector3(0, 0.9, 2.5);
    ladder.rotation.x = 0.35;
    ladder.material = metalMat;
    ladder.parent = root;

    return root;
  }

  // -------------------------------------------------------------------------
  // APOLLO LUNAR ROVING VEHICLE
  // -------------------------------------------------------------------------

  private buildLunarRover(): TransformNode {
    const root = new TransformNode(
      'lunar_rover_root',
      this.scene
    );

    const frameMat = new StandardMaterial(
      'roverFrameMat',
      this.scene
    );

    frameMat.diffuseColor = new Color3(0.65, 0.68, 0.72);

    const wheelMat = new StandardMaterial(
      'roverWheelMat',
      this.scene
    );

    wheelMat.diffuseColor = new Color3(0.2, 0.22, 0.26);

    const dishMat = new StandardMaterial(
      'roverDishMat',
      this.scene
    );

    dishMat.diffuseColor = new Color3(0.9, 0.75, 0.2);

    // Chassis.
    const chassis = MeshBuilder.CreateBox(
      'roverChassis',
      {
        width: 1.8,
        height: 0.22,
        depth: 3.1,
      },
      this.scene
    );

    chassis.position.y = 0.65;
    chassis.material = frameMat;
    chassis.parent = root;

    // Four wheels.
    const wheelPositions = [
      new Vector3(-1.1, 0.45, 1.1),
      new Vector3(1.1, 0.45, 1.1),
      new Vector3(-1.1, 0.45, -1.1),
      new Vector3(1.1, 0.45, -1.1),
    ];

    wheelPositions.forEach((position, index) => {
      const wheel = MeshBuilder.CreateCylinder(
        `roverWheel_${index}`,
        {
          height: 0.32,
          diameter: 0.82,
          tessellation: 16,
        },
        this.scene
      );

      wheel.rotation.z = Math.PI / 2;
      wheel.position = position;
      wheel.material = wheelMat;
      wheel.parent = root;
    });

    // Two crew seats.
    for (let i = 0; i < 2; i++) {
      const seatX = i === 0 ? -0.4 : 0.4;

      const seatBase = MeshBuilder.CreateBox(
        `seatBase_${i}`,
        {
          width: 0.5,
          height: 0.08,
          depth: 0.5,
        },
        this.scene
      );

      seatBase.position = new Vector3(seatX, 0.85, 0);
      seatBase.material = frameMat;
      seatBase.parent = root;

      const seatBack = MeshBuilder.CreateBox(
        `seatBack_${i}`,
        {
          width: 0.5,
          height: 0.6,
          depth: 0.08,
        },
        this.scene
      );

      seatBack.position = new Vector3(seatX, 1.15, -0.22);
      seatBack.material = frameMat;
      seatBack.parent = root;
    }

    // High-gain antenna dish.
    const dish = MeshBuilder.CreateDisc(
      'roverDish',
      {
        radius: 0.55,
        tessellation: 16,
      },
      this.scene
    );

    dish.position = new Vector3(0.5, 1.8, 1.2);
    dish.rotation.x = -0.5;
    dish.rotation.y = 0.4;
    dish.material = dishMat;
    dish.parent = root;

    const dishMast = MeshBuilder.CreateCylinder(
      'dishMast',
      {
        height: 1,
        diameter: 0.06,
      },
      this.scene
    );

    dishMast.position = new Vector3(0.5, 1.3, 1.2);
    dishMast.material = frameMat;
    dishMast.parent = root;

    return root;
  }

  // -------------------------------------------------------------------------
  // APOLLO ALSEP SCIENTIFIC PACKAGE
  // -------------------------------------------------------------------------

  private buildALSEP(): TransformNode {
    const root = new TransformNode(
      'alsep_root',
      this.scene
    );

    const stationMat = new StandardMaterial(
      'alsepStationMat',
      this.scene
    );

    stationMat.diffuseColor = new Color3(0.88, 0.9, 0.92);

    const rtgMat = new StandardMaterial(
      'rtgMat',
      this.scene
    );

    rtgMat.diffuseColor = new Color3(0.25, 0.28, 0.35);

    const goldMat = new StandardMaterial(
      'alsepGoldMat',
      this.scene
    );

    goldMat.diffuseColor = new Color3(0.95, 0.75, 0.2);

    // Central station.
    const station = MeshBuilder.CreateBox(
      'alsepStation',
      {
        width: 1.2,
        height: 0.7,
        depth: 1,
      },
      this.scene
    );

    station.position.y = 0.45;
    station.material = stationMat;
    station.parent = root;

    // Antenna mast.
    const mast = MeshBuilder.CreateCylinder(
      'alsepMast',
      {
        height: 1.6,
        diameter: 0.06,
      },
      this.scene
    );

    mast.position = new Vector3(0, 1.5, 0);
    mast.material = stationMat;
    mast.parent = root;

    // Radioisotope Thermoelectric Generator.
    const rtg = MeshBuilder.CreateCylinder(
      'alsepRTG',
      {
        height: 0.75,
        diameter: 0.5,
        tessellation: 12,
      },
      this.scene
    );

    rtg.position = new Vector3(1.8, 0.4, 0.5);
    rtg.material = rtgMat;
    rtg.parent = root;

    // Seismometer representation.
    const seismometer = MeshBuilder.CreateCylinder(
      'alsepSeismo',
      {
        height: 0.4,
        diameterTop: 0.1,
        diameterBottom: 0.7,
        tessellation: 12,
      },
      this.scene
    );

    seismometer.position = new Vector3(-1.6, 0.25, -0.6);
    seismometer.material = goldMat;
    seismometer.parent = root;

    return root;
  }

  // -------------------------------------------------------------------------
  // MARS ARTIFACT 1: VIKING 1 LANDER (1976 - Chryse Planitia)
  // -------------------------------------------------------------------------

  private buildVikingLander(): TransformNode {
    const root = new TransformNode('viking1_lander_root', this.scene);

    const whiteMat = new StandardMaterial('vikingWhiteMat', this.scene);
    whiteMat.diffuseColor = new Color3(0.86, 0.88, 0.9);
    whiteMat.specularColor = new Color3(0.3, 0.3, 0.35);

    const darkMat = new StandardMaterial('vikingDarkMat', this.scene);
    darkMat.diffuseColor = new Color3(0.2, 0.22, 0.26);

    const goldMat = new StandardMaterial('vikingGoldMat', this.scene);
    goldMat.diffuseColor = new Color3(0.92, 0.72, 0.18);
    goldMat.specularColor = new Color3(1, 0.85, 0.3);

    // Hexagonal main lander body
    const body = MeshBuilder.CreateCylinder(
      'vikingBody',
      {
        height: 0.85,
        diameter: 2.8,
        tessellation: 6,
      },
      this.scene
    );
    body.position.y = 0.95;
    body.material = whiteMat;
    body.parent = root;

    // Three landing struts with footpads (120 deg apart)
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const legDist = 2.2;

      const leg = MeshBuilder.CreateCylinder(
        `vikingLeg_${i}`,
        {
          height: 1.8,
          diameter: 0.14,
        },
        this.scene
      );
      leg.position = new Vector3(
        Math.cos(angle) * (legDist * 0.5),
        0.55,
        Math.sin(angle) * (legDist * 0.5)
      );
      leg.rotation.z = Math.cos(angle) * 0.55;
      leg.rotation.x = -Math.sin(angle) * 0.55;
      leg.material = whiteMat;
      leg.parent = root;

      const pad = MeshBuilder.CreateCylinder(
        `vikingPad_${i}`,
        {
          height: 0.1,
          diameter: 0.75,
          tessellation: 12,
        },
        this.scene
      );
      pad.position = new Vector3(
        Math.cos(angle) * legDist,
        0.05,
        Math.sin(angle) * legDist
      );
      pad.material = darkMat;
      pad.parent = root;
    }

    // Dual RTG power canisters with wind covers
    const rtg1 = MeshBuilder.CreateCylinder('vikingRTG1', { height: 0.7, diameter: 0.42, tessellation: 10 }, this.scene);
    rtg1.position = new Vector3(-0.9, 1.45, 0.4);
    rtg1.material = darkMat;
    rtg1.parent = root;

    const rtg2 = MeshBuilder.CreateCylinder('vikingRTG2', { height: 0.7, diameter: 0.42, tessellation: 10 }, this.scene);
    rtg2.position = new Vector3(-0.9, 1.45, -0.4);
    rtg2.material = darkMat;
    rtg2.parent = root;

    // High-gain parabolic dish antenna (directed Earthward)
    const dish = MeshBuilder.CreateDisc('vikingDish', { radius: 0.45, tessellation: 18 }, this.scene);
    dish.rotation.x = Math.PI / 3;
    dish.rotation.y = -Math.PI / 4;
    dish.position = new Vector3(0.5, 1.85, 0.5);
    dish.material = whiteMat;
    dish.parent = root;

    // Dual facsimile scanning cameras
    for (let c = 0; c < 2; c++) {
      const cam = MeshBuilder.CreateCylinder(`vikingCam_${c}`, { height: 0.55, diameter: 0.18 }, this.scene);
      cam.position = new Vector3(0.2, 1.65, c === 0 ? 0.7 : -0.7);
      cam.material = darkMat;
      cam.parent = root;
    }

    // Surface sampler robotic boom arm extending to the soil
    const arm = MeshBuilder.CreateCylinder('vikingArm', { height: 1.8, diameter: 0.08 }, this.scene);
    arm.rotation.z = Math.PI / 3.2;
    arm.position = new Vector3(1.3, 0.6, 0);
    arm.material = whiteMat;
    arm.parent = root;

    const scoop = MeshBuilder.CreateBox('vikingScoop', { width: 0.22, height: 0.12, depth: 0.16 }, this.scene);
    scoop.position = new Vector3(2.1, 0.12, 0);
    scoop.material = goldMat;
    scoop.parent = root;

    // Meteorology mast (weather station)
    const mast = MeshBuilder.CreateCylinder('vikingMetMast', { height: 1.4, diameter: 0.06 }, this.scene);
    mast.position = new Vector3(0, 1.95, -0.8);
    mast.material = darkMat;
    mast.parent = root;

    return root;
  }

  // -------------------------------------------------------------------------
  // MARS ARTIFACT 2: SOJOURNER ROVER (1997 - Ares Vallis)
  // -------------------------------------------------------------------------

  private buildSojournerRover(): TransformNode {
    const root = new TransformNode('sojourner_rover_root', this.scene);

    const solarMat = new StandardMaterial('sojournerSolarMat', this.scene);
    solarMat.diffuseColor = new Color3(0.08, 0.16, 0.38);
    solarMat.specularColor = new Color3(0.6, 0.75, 0.95);

    const metalMat = new StandardMaterial('sojournerMetalMat', this.scene);
    metalMat.diffuseColor = new Color3(0.72, 0.75, 0.8);

    const wheelMat = new StandardMaterial('sojournerWheelMat', this.scene);
    wheelMat.diffuseColor = new Color3(0.25, 0.26, 0.28);

    const apxsMat = new StandardMaterial('sojournerAPXSMat', this.scene);
    apxsMat.diffuseColor = new Color3(0.85, 0.68, 0.2);

    // Warm electronics box chassis
    const chassis = MeshBuilder.CreateBox(
      'sojournerChassis',
      {
        width: 1.05,
        height: 0.3,
        depth: 0.75,
      },
      this.scene
    );
    chassis.position.y = 0.42;
    chassis.material = metalMat;
    chassis.parent = root;

    // Flat solar panel top cover
    const solarPanel = MeshBuilder.CreateBox(
      'sojournerSolarPanel',
      {
        width: 1.15,
        height: 0.06,
        depth: 0.85,
      },
      this.scene
    );
    solarPanel.position.y = 0.58;
    solarPanel.material = solarMat;
    solarPanel.parent = root;

    // 6-wheel rocker-bogie mobility system (3 per side)
    const wheelPositions = [
      { x: 0.55, z: 0.48 },
      { x: 0.0, z: 0.5 },
      { x: -0.55, z: 0.48 },
      { x: 0.55, z: -0.48 },
      { x: 0.0, z: -0.5 },
      { x: -0.55, z: -0.48 },
    ];

    wheelPositions.forEach((wp, idx) => {
      const wheel = MeshBuilder.CreateCylinder(
        `sojournerWheel_${idx}`,
        {
          height: 0.14,
          diameter: 0.28,
          tessellation: 12,
        },
        this.scene
      );
      wheel.rotation.x = Math.PI / 2;
      wheel.position = new Vector3(wp.x, 0.14, wp.z);
      wheel.material = wheelMat;
      wheel.parent = root;
    });

    // Forward stereo cameras
    const frontCam = MeshBuilder.CreateBox('sojournerFrontCam', { width: 0.28, height: 0.12, depth: 0.12 }, this.scene);
    frontCam.position = new Vector3(0.55, 0.62, 0);
    frontCam.material = metalMat;
    frontCam.parent = root;

    // Rear APXS sensor head (placed down near ground)
    const apxs = MeshBuilder.CreateCylinder('sojournerAPXS', { height: 0.18, diameter: 0.22, tessellation: 10 }, this.scene);
    apxs.rotation.z = Math.PI / 2;
    apxs.position = new Vector3(-0.68, 0.18, 0);
    apxs.material = apxsMat;
    apxs.parent = root;

    // Whip antenna
    const antenna = MeshBuilder.CreateCylinder('sojournerAntenna', { height: 0.65, diameter: 0.02 }, this.scene);
    antenna.position = new Vector3(-0.35, 0.9, 0.28);
    antenna.material = metalMat;
    antenna.parent = root;

    return root;
  }

  // -------------------------------------------------------------------------
  // MARS ARTIFACT 3: SPIRIT ROVER / MER-A (2004 - Gusev Crater)
  // -------------------------------------------------------------------------

  private buildSpiritRover(): TransformNode {
    const root = new TransformNode('spirit_mer_root', this.scene);

    const solarMat = new StandardMaterial('spiritSolarMat', this.scene);
    solarMat.diffuseColor = new Color3(0.06, 0.12, 0.28);
    solarMat.specularColor = new Color3(0.7, 0.85, 1.0);

    const metalMat = new StandardMaterial('spiritMetalMat', this.scene);
    metalMat.diffuseColor = new Color3(0.78, 0.8, 0.84);

    const wheelMat = new StandardMaterial('spiritWheelMat', this.scene);
    wheelMat.diffuseColor = new Color3(0.2, 0.22, 0.25);

    const goldFoilMat = new StandardMaterial('spiritGoldMat', this.scene);
    goldFoilMat.diffuseColor = new Color3(0.95, 0.78, 0.2);

    // Warm electronics box (central body)
    const web = MeshBuilder.CreateBox('spiritWEB', { width: 1.4, height: 0.5, depth: 1.1 }, this.scene);
    web.position.y = 0.65;
    web.material = goldFoilMat;
    web.parent = root;

    // Arrowhead / Triangular Solar Array Deck
    const solarDeck = MeshBuilder.CreateBox('spiritSolarDeck', { width: 2.1, height: 0.08, depth: 1.7 }, this.scene);
    solarDeck.position.y = 0.94;
    solarDeck.material = solarMat;
    solarDeck.parent = root;

    // Wing flare panels
    const wingLeft = MeshBuilder.CreateBox('spiritWingL', { width: 0.8, height: 0.06, depth: 0.9 }, this.scene);
    wingLeft.rotation.z = -0.15;
    wingLeft.position = new Vector3(-0.85, 0.96, 0.9);
    wingLeft.material = solarMat;
    wingLeft.parent = root;

    const wingRight = MeshBuilder.CreateBox('spiritWingR', { width: 0.8, height: 0.06, depth: 0.9 }, this.scene);
    wingRight.rotation.z = -0.15;
    wingRight.position = new Vector3(-0.85, 0.96, -0.9);
    wingRight.material = solarMat;
    wingRight.parent = root;

    // Tall Pancam / Navcam Mast (1.4m height)
    const mast = MeshBuilder.CreateCylinder('spiritMast', { height: 1.35, diameter: 0.08 }, this.scene);
    mast.position = new Vector3(0.55, 1.62, 0);
    mast.material = metalMat;
    mast.parent = root;

    // Masthead camera crossbar
    const camBar = MeshBuilder.CreateBox('spiritCamBar', { width: 0.15, height: 0.12, depth: 0.45 }, this.scene);
    camBar.position = new Vector3(0.55, 2.3, 0);
    camBar.material = metalMat;
    camBar.parent = root;

    // High-Gain Antenna parabolic dish
    const hga = MeshBuilder.CreateDisc('spiritHGA', { radius: 0.28, tessellation: 16 }, this.scene);
    hga.rotation.x = Math.PI / 3;
    hga.position = new Vector3(-0.55, 1.25, -0.55);
    hga.material = metalMat;
    hga.parent = root;

    // 6-wheel rocker-bogie system
    const wheels = [
      { x: 0.95, z: 0.85, turn: 0.0 },
      { x: 0.0, z: 0.95, turn: 0.0 },
      { x: -0.95, z: 0.85, turn: 0.0 },
      // Right-side wheels: front right wheel (turn: 0.35) commemorates the stuck wheel that dug up pure silica!
      { x: 0.95, z: -0.85, turn: 0.35 },
      { x: 0.0, z: -0.95, turn: 0.0 },
      { x: -0.95, z: -0.85, turn: 0.0 },
    ];

    wheels.forEach((w, idx) => {
      const wheel = MeshBuilder.CreateCylinder(
        `spiritWheel_${idx}`,
        {
          height: 0.22,
          diameter: 0.44,
          tessellation: 14,
        },
        this.scene
      );
      wheel.rotation.x = Math.PI / 2;
      wheel.rotation.y = w.turn;
      wheel.position = new Vector3(w.x, 0.22, w.z);
      wheel.material = wheelMat;
      wheel.parent = root;
    });

    // Robotic Instrument Arm (IDD) extended toward a soil trench
    const arm1 = MeshBuilder.CreateCylinder('spiritArm1', { height: 0.7, diameter: 0.08 }, this.scene);
    arm1.rotation.z = Math.PI / 3.5;
    arm1.position = new Vector3(1.15, 0.5, 0);
    arm1.material = metalMat;
    arm1.parent = root;

    const turret = MeshBuilder.CreateCylinder('spiritTurret', { height: 0.2, diameter: 0.24 }, this.scene);
    turret.position = new Vector3(1.55, 0.15, 0);
    turret.material = goldFoilMat;
    turret.parent = root;

    return root;
  }

  // -------------------------------------------------------------------------
  // BEACON SYSTEM
  // -------------------------------------------------------------------------

  private createBeacon(
    artifact: ArtifactDefinition,
    position: Vector3
  ): void {
    const beaconMat = new StandardMaterial(
      `beaconMat_${artifact.id}`,
      this.scene
    );

    beaconMat.emissiveColor = new Color3(0.27, 0.85, 0.91);
    beaconMat.alpha = 0.5;
    beaconMat.disableLighting = true;

    const ring = MeshBuilder.CreateTorus(
      `beaconRing_${artifact.id}`,
      {
        diameter: 3.2,
        thickness: 0.12,
        tessellation: 24,
      },
      this.scene
    );

    ring.position = position.add(new Vector3(0, 2.5, 0));
    ring.material = beaconMat;

    this.beaconRings.set(artifact.id, ring);
  }

  // -------------------------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------------------------

  public update(deltaTime: number): void {
    this.elapsedTime += deltaTime;

    this.beaconRings.forEach((ring, artifactId) => {
      if (this.collectedArtifacts.has(artifactId)) {
        ring.setEnabled(false);
        return;
      }

      ring.rotation.y += deltaTime * 0.8;

      const pulse =
        1 + Math.sin(this.elapsedTime * 3) * 0.15;

      ring.scaling.x = pulse;
      ring.scaling.z = pulse;
    });
  }

  // -------------------------------------------------------------------------
  // ARTIFACT ACCESS
  // -------------------------------------------------------------------------

  public getArtifactById(
    id: string
  ): ArtifactDefinition | undefined {
    return this.artifacts.find(
      (artifact) => artifact.id === id
    );
  }

  public getArtifactMesh(
    id: string
  ): TransformNode | undefined {
    return this.artifactMeshes.get(id);
  }

  public isCollected(id: string): boolean {
    return this.collectedArtifacts.has(id);
  }

  public markCollected(id: string): void {
    const artifact = this.getArtifactById(id);

    if (!artifact) {
      return;
    }

    this.collectedArtifacts.add(id);
    artifact.isCollected = true;

    const ring = this.beaconRings.get(id);

    if (ring) {
      ring.setEnabled(false);
    }
  }

  public getCollectedCount(): number {
    return this.collectedArtifacts.size;
  }

  public getTotalCount(): number {
    return this.artifacts.length;
  }

  // -------------------------------------------------------------------------
  // CLEANUP
  // -------------------------------------------------------------------------

  public dispose(): void {
    this.beaconRings.forEach((ring) => {
      ring.dispose();
    });

    this.beaconRings.clear();

    this.artifactMeshes.forEach((root) => {
      root.dispose(false, true);
    });

    this.artifactMeshes.clear();
    this.collectedArtifacts.clear();
    this.artifacts = [];
  }
}
