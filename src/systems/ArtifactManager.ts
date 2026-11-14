
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

  private artifactPositions: Record<string, Vector3> = {
    'a11-lm5-descent': new Vector3(32, 0, 22),
    'a12-lm6-ascent': new Vector3(-28, 0, 32),
    'a15-lm10-ascent': new Vector3(14, 0, -38),
  };

  constructor(scene: Scene) {
    this.scene = scene;

    // Load Moon artifacts (Level 1).
    this.artifacts = Object.values(ARTIFACTS_DATA).filter(
      (artifact) => artifact.level === 1
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
      identity.includes('rover') ||
      identity.includes('lunar roving vehicle') ||
      identity.includes('lrv') ||
      identity.includes('falcon') ||
      identity.includes('lm-10') ||
      identity.includes('lm10') ||
      artifact.id === 'a15-lm10-ascent'
    ) {
      return this.buildLunarRover();
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
