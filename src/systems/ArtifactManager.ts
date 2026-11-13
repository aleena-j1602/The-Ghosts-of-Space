import {
  Scene,
  TransformNode,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Vector3,
  Mesh,
} from '@babylonjs/core';
import { SpaceArtifact, ARTIFACTS_DATA } from '../data/artifacts.ts';

export class ArtifactManager {
  private scene: Scene;
  public artifacts: SpaceArtifact[] = [];
  public artifactMeshes: Map<string, TransformNode> = new Map();
  private beaconRings: Map<string, Mesh> = new Map();

  constructor(scene: Scene) {
    this.scene = scene;
    // Load Moon artifacts from data
    this.artifacts = Object.values(ARTIFACTS_DATA).filter((a) => a.level === 'MOON');
    this.spawnArtifacts();
  }

  private spawnArtifacts(): void {
    this.artifacts.forEach((artifact) => {
      let rootNode: TransformNode;

      switch (artifact.id) {
        case 'apollo11_eagle':
          rootNode = this.buildApollo11Eagle();
          break;
        case 'apollo_rover':
          rootNode = this.buildLunarRover();
          break;
        case 'apollo_alsep':
          rootNode = this.buildALSEP();
          break;
        default:
          rootNode = new TransformNode(`artifact_${artifact.id}`, this.scene);
      }

      rootNode.position = new Vector3(
        artifact.coordinates.x,
        artifact.coordinates.y,
        artifact.coordinates.z
      );
      this.artifactMeshes.set(artifact.id, rootNode);

      // Create glowing holographic scan beacon ring above artifact
      const beaconMat = new StandardMaterial(`beaconMat_${artifact.id}`, this.scene);
      beaconMat.emissiveColor = new Color3(0.27, 0.85, 0.91);
      beaconMat.alpha = 0.5;
      beaconMat.disableLighting = true;

      const ring = MeshBuilder.CreateTorus(
        `beaconRing_${artifact.id}`,
        { diameter: 3.2, thickness: 0.12, tessellation: 24 },
        this.scene
      );
      ring.position = new Vector3(
        artifact.coordinates.x,
        artifact.coordinates.y + 2.5,
        artifact.coordinates.z
      );
      ring.material = beaconMat;
      this.beaconRings.set(artifact.id, ring);
    });
  }

  // 1. Apollo 11 Eagle Descent Stage
  private buildApollo11Eagle(): TransformNode {
    const root = new TransformNode('apollo11_eagle_root', this.scene);

    const goldMat = new StandardMaterial('eagleGoldMat', this.scene);
    goldMat.diffuseColor = new Color3(0.95, 0.75, 0.15);
    goldMat.specularColor = new Color3(1.0, 0.9, 0.3);

    const blackFoilMat = new StandardMaterial('eagleBlackFoil', this.scene);
    blackFoilMat.diffuseColor = new Color3(0.1, 0.1, 0.12);

    const metalMat = new StandardMaterial('eagleMetalMat', this.scene);
    metalMat.diffuseColor = new Color3(0.3, 0.32, 0.38);

    // Octagonal base
    const base = MeshBuilder.CreateCylinder(
      'eagleBase',
      { height: 1.6, diameter: 4.8, tessellation: 8 },
      this.scene
    );
    base.position.y = 1.0;
    base.material = goldMat;
    base.parent = root;

    // Center descent engine bell
    const bell = MeshBuilder.CreateCylinder(
      'eagleEngineBell',
      { height: 1.2, diameterTop: 0.8, diameterBottom: 1.4, tessellation: 16 },
      this.scene
    );
    bell.position.y = 0.5;
    bell.material = blackFoilMat;
    bell.parent = root;

    // 4 Landing struts with footpads
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const strutDist = 3.2;

      const strut = MeshBuilder.CreateCylinder(
        `eagleStrut_${i}`,
        { height: 2.6, diameter: 0.18 },
        this.scene
      );
      strut.position = new Vector3(
        Math.cos(angle) * (strutDist * 0.5),
        0.8,
        Math.sin(angle) * (strutDist * 0.5)
      );
      strut.rotation.z = Math.cos(angle) * 0.5;
      strut.rotation.x = -Math.sin(angle) * 0.5;
      strut.material = goldMat;
      strut.parent = root;

      // Footpad
      const pad = MeshBuilder.CreateCylinder(
        `eaglePad_${i}`,
        { height: 0.12, diameter: 0.85, tessellation: 12 },
        this.scene
      );
      pad.position = new Vector3(
        Math.cos(angle) * strutDist,
        0.06,
        Math.sin(angle) * strutDist
      );
      pad.material = metalMat;
      pad.parent = root;
    }

    // Forward Ladder & Plaque
    const ladder = MeshBuilder.CreateBox('eagleLadder', { width: 0.45, height: 1.8, depth: 0.1 }, this.scene);
    ladder.position = new Vector3(0, 0.9, 2.5);
    ladder.rotation.x = 0.35;
    ladder.material = metalMat;
    ladder.parent = root;

    return root;
  }

  // 2. Apollo Lunar Roving Vehicle (LRV)
  private buildLunarRover(): TransformNode {
    const root = new TransformNode('lunar_rover_root', this.scene);

    const frameMat = new StandardMaterial('roverFrameMat', this.scene);
    frameMat.diffuseColor = new Color3(0.65, 0.68, 0.72);

    const wheelMat = new StandardMaterial('roverWheelMat', this.scene);
    wheelMat.diffuseColor = new Color3(0.2, 0.22, 0.26);

    const dishMat = new StandardMaterial('roverDishMat', this.scene);
    dishMat.diffuseColor = new Color3(0.9, 0.75, 0.2);

    // Chassis frame
    const chassis = MeshBuilder.CreateBox('roverChassis', { width: 1.8, height: 0.22, depth: 3.1 }, this.scene);
    chassis.position.y = 0.65;
    chassis.material = frameMat;
    chassis.parent = root;

    // 4 Wheels
    const wheelPositions = [
      new Vector3(-1.1, 0.45, 1.1),
      new Vector3(1.1, 0.45, 1.1),
      new Vector3(-1.1, 0.45, -1.1),
      new Vector3(1.1, 0.45, -1.1),
    ];

    wheelPositions.forEach((pos, idx) => {
      const wheel = MeshBuilder.CreateCylinder(
        `roverWheel_${idx}`,
        { height: 0.32, diameter: 0.82, tessellation: 16 },
        this.scene
      );
      wheel.rotation.z = Math.PI / 2;
      wheel.position = pos;
      wheel.material = wheelMat;
      wheel.parent = root;
    });

    // Crew seats (two lawn-chair style seats)
    for (let i = 0; i < 2; i++) {
      const seatX = i === 0 ? -0.4 : 0.4;
      const seatBase = MeshBuilder.CreateBox(`seatBase_${i}`, { width: 0.5, height: 0.08, depth: 0.5 }, this.scene);
      seatBase.position = new Vector3(seatX, 0.85, 0);
      seatBase.material = frameMat;
      seatBase.parent = root;

      const seatBack = MeshBuilder.CreateBox(`seatBack_${i}`, { width: 0.5, height: 0.6, depth: 0.08 }, this.scene);
      seatBack.position = new Vector3(seatX, 1.15, -0.22);
      seatBack.material = frameMat;
      seatBack.parent = root;
    }

    // High-gain mesh umbrella dish antenna
    const dish = MeshBuilder.CreateDisc('roverDish', { radius: 0.55, tessellation: 16 }, this.scene);
    dish.position = new Vector3(0.5, 1.8, 1.2);
    dish.rotation.x = -0.5;
    dish.rotation.y = 0.4;
    dish.material = dishMat;
    dish.parent = root;

    const dishMast = MeshBuilder.CreateCylinder('dishMast', { height: 1.0, diameter: 0.06 }, this.scene);
    dishMast.position = new Vector3(0.5, 1.3, 1.2);
    dishMast.material = frameMat;
    dishMast.parent = root;

    return root;
  }

  // 3. Apollo ALSEP Scientific Package
  private buildALSEP(): TransformNode {
    const root = new TransformNode('alsep_root', this.scene);

    const stationMat = new StandardMaterial('alsepStationMat', this.scene);
    stationMat.diffuseColor = new Color3(0.88, 0.9, 0.92);

    const rtgMat = new StandardMaterial('rtgMat', this.scene);
    rtgMat.diffuseColor = new Color3(0.25, 0.28, 0.35);

    const goldMat = new StandardMaterial('alsepGoldMat', this.scene);
    goldMat.diffuseColor = new Color3(0.95, 0.75, 0.2);

    // Central Station box with thermal blanket
    const station = MeshBuilder.CreateBox('alsepStation', { width: 1.2, height: 0.7, depth: 1.0 }, this.scene);
    station.position.y = 0.45;
    station.material = stationMat;
    station.parent = root;

    // Helical antenna mast
    const mast = MeshBuilder.CreateCylinder('alsepMast', { height: 1.6, diameter: 0.06 }, this.scene);
    mast.position = new Vector3(0, 1.5, 0);
    mast.material = stationMat;
    mast.parent = root;

    // Radioisotope Thermoelectric Generator (RTG)
    const rtg = MeshBuilder.CreateCylinder('alsepRTG', { height: 0.75, diameter: 0.5, tessellation: 12 }, this.scene);
    rtg.position = new Vector3(1.8, 0.4, 0.5);
    rtg.material = rtgMat;
    rtg.parent = root;

    // Passive Seismometer experiment (gold foil cone)
    const seismometer = MeshBuilder.CreateCylinder(
      'alsepSeismo',
      { height: 0.4, diameterTop: 0.1, diameterBottom: 0.7, tessellation: 12 },
      this.scene
    );
    seismometer.position = new Vector3(-1.6, 0.25, -0.6);
    seismometer.material = goldMat;
    seismometer.parent = root;

    return root;
  }

  public update(deltaTime: number): void {
    // Animate glowing beacon rings (pulsing hover & slow spin)
    this.beaconRings.forEach((ring, artifactId) => {
      const artifact = this.artifacts.find((a) => a.id === artifactId);
      if (artifact?.isCollected) {
        ring.setEnabled(false);
      } else {
        ring.rotation.y += deltaTime * 0.8;
        ring.scaling.x = 1.0 + Math.sin(performance.now() * 0.003) * 0.15;
        ring.scaling.z = 1.0 + Math.sin(performance.now() * 0.003) * 0.15;
      }
    });
  }

  public getArtifactById(id: string): SpaceArtifact | undefined {
    return this.artifacts.find((a) => a.id === id);
  }

  public markCollected(id: string): void {
    const art = this.artifacts.find((a) => a.id === id);
    if (art) {
      art.isCollected = true;
      const ring = this.beaconRings.get(id);
      if (ring) {
        ring.setEnabled(false);
      }
    }
  }

  public dispose(): void {
    this.artifactMeshes.forEach((mesh) => mesh.dispose());
    this.beaconRings.forEach((ring) => ring.dispose());
  }
}
