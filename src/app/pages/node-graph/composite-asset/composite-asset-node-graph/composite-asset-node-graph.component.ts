import {AfterViewInit, Component, ComponentRef, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {CommandNavigatorService} from '../../../../services/system/sofia/command-navigator.service';
import {NodeGraphService} from '../../../../services/crud/cityscape/node-graph.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageComponent} from '../../../page/page-component';
import {CompositAssetNodeGraphService} from '../../../../services/crud/cityscape/composit-asset-node-graph.service';
import {Location} from '@angular/common';

class Position {
  top;
  left;
}

class Node {
  id;
  code;
  name;
  atoa_id
  relationship_id;
  relationship_code;
  relationship_name;
  cssPosition: String;
  userDragged: false;
  cssClass;
  position: Position;
  topCenterPosition: Position;
  bottomCenterPosition: Position;
  centerLeftPosition: Position;
  centerRightPosition: Position;
  linkedPosition: Position;
  economicValuePriority;

  constructor() {
    this.id = 0;
    this.code = '';
    this.cssPosition = '';
    this.userDragged = false;
    this.cssClass = '';
    this.position = new Position();
    this.topCenterPosition = new Position();
    this.bottomCenterPosition = new Position();
    this.centerLeftPosition = new Position();
    this.centerRightPosition = new Position();
    this.linkedPosition = new Position();
    this.relationship_id = 0;
    this.atoa_id = 0;
    this.relationship_code = '';
    this.relationship_name = '';
    this.code = '';
    this.economicValuePriority = '';
  }
}

class RelNode {
  id;
  code;
  name;
  cssPosition: String;
  cssClass;
  position: Position;
  node: Node;

  constructor() {
    this.id = 0;
    this.code = '';
    this.cssPosition = '';
    this.cssClass = '';
    this.position = new Position();
    this.code = '';
  }
}

class NodeDTO {
  id;
  position: Position;
  nodes: NodeDTO[]
}

@Component({
  selector: 'app-composite-asset-node-graph',
  templateUrl: './composite-asset-node-graph.component.html',
  styleUrls: ['./composite-asset-node-graph.component.css']
})
export class CompositeAssetNodeGraphComponent extends PageComponent implements OnInit, AfterViewInit {

  @ViewChild('parentGraphContainer') parentGraphContainer: ElementRef;
  @ViewChild('nodeGraphContainer') nodeGraphContainer: ElementRef;
  @ViewChild('svgContainer') svgContainer: ElementRef;

  public dto;
  useSavedNodePositions = false;
  // public mode: string;

  /* Node Sizes */
  nodeWidth = 150;
  nodeHeight = 84;
  nodeWidthCenter = 75;
  nodeHeightCenter = 42;

  /* Parent Div Sizes */
  parentDivWidth = 0;
  parentDivHeight = 0;
  parentDivWidthCenterPosition = 0
  parentDivHeightCenterPosition = 0;

  /* Radius Size */
  radius = 300;
  angleStep = 0;
  newNodeAngle = 270;

  centralNode = {id: 0, code: '', name: '', cssPosition: 'left: -1000px; top: -1000px;', position: new Position()};
  nodes: Node[] = [];
  relationships: RelNode[] = [];

  startDragEvent: DragEvent = null;
  startDragNode = null;

  // For Auto Complete Combobox
  public selectedNode: Node;
  public selectedRelNode: RelNode;
  public threatsList: any;

  constructor(private navigatorService: CommandNavigatorService,
              private service: CompositAssetNodeGraphService,
              private assetService: NodeGraphService,
              private activatedRoute: ActivatedRoute,
              private commandNavigatorService: CommandNavigatorService,
              private router: Router,
              private location: Location) {
    super();
  }

  ngOnInit(): void {

    document.addEventListener('dragover', function( event ) {
      event.preventDefault();
    }, false);

    this.initNav(this.activatedRoute);
    this.selectedNode = new Node();
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh(): void {
    const locateParams = this.getLocateParams();
    const id = locateParams.get('ID');
    this.service.getCompositAsset(id).subscribe(dto => {
      this.dto = dto;
      this.initializeNodes();
      this.initializeSchemasPositions();
      if (this.useSavedNodePositions) {
        this.defineNodesCssPositions();
      } else {
        this.defineNodesCerclecPositions();
      }
      this.setSvgWidths();
      this.defineLines();
      this.defineRelationships();
    });
  }

  initializeNodes(): void {
    this.centralNode.id = this.dto['id'];
    this.centralNode.code = this.dto['code'];
    this.centralNode.name = this.dto['name'];
    this.centralNode.position.left = this.dto['graph_left'];
    this.centralNode.position.top = this.dto['graph_top'];

    if (this.dto['graph_pos_saved'] === 1) {
      this.useSavedNodePositions = true;
    }

    if (this.dto['assets'] == null) {
      return;
    }

    this.dto['assets'].forEach(asset => {
      const node = new Node();
      node.id = asset['id'];
      node.code = asset['code'];
      node.name = asset['name'];
      node.relationship_id = asset['relationship_id'];
      node.atoa_id = asset['atoa_id'];
      node.relationship_code = asset['relationship_code'];
      node.relationship_name = asset['relationship_name'];
      node.atoa_id = asset['atoa_id'];
      node.position.left = asset['graph_left'];
      node.position.top = asset['graph_top'];
      node.economicValuePriority = asset['economic_value_priority'];
      this.nodes.push(node);
    });
  }

  initializeSchemasPositions(): void {

    /* Parent Div Sizes */
    this.parentDivWidth = this.nodeGraphContainer.nativeElement.clientWidth;
    this.parentDivHeight = this.nodeGraphContainer.nativeElement.clientHeight;
    this.parentDivWidthCenterPosition = this.parentDivWidth / 2;
    this.parentDivHeightCenterPosition = this.parentDivHeight / 2;

    /* Radius Size */
    if (this.parentDivHeight < this.parentDivWidth) {
      this.radius = this.parentDivHeight * 0.35;
    } else {
      this.radius = this.parentDivWidth * 0.35;
    }

    const totalNodes = this.nodes.length;
    this.angleStep = 360 / totalNodes;
  }

  defineNodesCssPositions(): void {
    this.centralNode.cssPosition = 'left: ' + this.centralNode.position.left + 'px; top: ' + this.centralNode.position.top + 'px;';
    this.nodes.forEach(node => {
      node.cssPosition = ('left: ' + node.position.left + 'px; top: ' + node.position.top + 'px;');
    });
  }

  defineNodesCerclecPositions(): void {
    let currentAngle = 0;
    this.nodes.forEach(node => {
      const x = this.radius * Math.sin(Math.PI * 2 * currentAngle / 360);
      const y = this.radius * Math.cos(Math.PI * 2 * currentAngle / 360);

      const left = (x + this.parentDivWidthCenterPosition);
      const top = (y + this.parentDivHeightCenterPosition);

      node.cssPosition = ('left: ' + left + 'px; top: ' + top + 'px;');
      node.position.top = top;
      node.position.left = left;

      currentAngle += this.angleStep;
    });

    const cLeft = (this.parentDivWidthCenterPosition) - this.nodeWidthCenter;
    const cTop = (this.parentDivHeightCenterPosition) - this.nodeHeightCenter
    this.centralNode.cssPosition = 'left: ' + cLeft + 'px; top: ' + cTop + 'px;';
    this.centralNode.position.top = cTop;
    this.centralNode.position.left = cLeft;
  }

  defineLines(): void {
    const parentElement = document.getElementById('svg-lines');
    parentElement.innerHTML = '';
    this.nodes.forEach(node => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.classList.add('svgline');

      const x1 = this.centralNode.position.left + this.nodeWidthCenter;
      const y1 = this.centralNode.position.top + this.nodeHeightCenter;
      const x2 = node.position.left;
      const y2 = node.position.top;
      let minDistance = 0;
      let x = 0;
      let y = 0;

      const topLeftY = y2 + 15;
      const topLeftX = x2 + 15;
      minDistance = Math.sqrt(Math.pow((x1 - topLeftX), 2) + Math.pow((y1 - topLeftY), 2));
      x = x2 - 9;
      y = y2 - 9;


      const topCenterY = y2 - 15;
      const topCenterX = x2 + this.nodeWidthCenter;
      const topCenterDistance = Math.sqrt(Math.pow((x1 - topCenterX), 2) + Math.pow((y1 - topCenterY), 2));
      if (topCenterDistance < minDistance) {
        minDistance = topCenterDistance;
        x = topCenterX;
        y = topCenterY;
      }

      const topRightY = y2 + 15;
      const topRightX = x2 + this.nodeWidthCenter + this.nodeWidthCenter - 15;
      const topRightDistance = Math.sqrt(Math.pow((x1 - topRightX), 2) + Math.pow((y1 - topRightY), 2));
      if (topRightDistance < minDistance) {
        minDistance = topRightDistance;
        y = y2 - 9;
        x = x2 + this.nodeWidthCenter + this.nodeWidthCenter + 9;
      }

      const bottomLeftY = y2 + this.nodeHeightCenter + this.nodeHeightCenter - 15;
      const bottomLeftX = x2 + 15;
      const bottomLeftDistance = Math.sqrt(Math.pow((x1 - bottomLeftX), 2) + Math.pow((y1 - bottomLeftY), 2));
      if (bottomLeftDistance < minDistance) {
        minDistance = bottomLeftDistance;
        y = y2 + this.nodeHeightCenter + this.nodeHeightCenter + 9;
        x = x2 - 9;
      }

      const bottomCenterY = y2 + this.nodeHeightCenter + this.nodeHeightCenter + 15;
      const bottomCenterX = x2 + this.nodeWidthCenter;
      const bottomCenterDistance = Math.sqrt(Math.pow((x1 - bottomCenterX), 2) + Math.pow((y1 - bottomCenterY), 2));
      if (bottomCenterDistance < minDistance) {
        minDistance = bottomCenterDistance;
        y = bottomCenterY;
        x = bottomCenterX;
      }

      const bottomRightY = y2 + this.nodeHeightCenter + this.nodeHeightCenter - 15;
      const bottomRightX = x2 + this.nodeWidthCenter + this.nodeWidthCenter - 15;
      const bottomRightDistance = Math.sqrt(Math.pow((x1 - bottomRightX), 2) + Math.pow((y1 - bottomRightY), 2));
      if (bottomRightDistance < minDistance) {
        minDistance = bottomRightDistance;
        x = x2 + this.nodeWidthCenter + this.nodeWidthCenter + 9;
        y = y2 + this.nodeHeightCenter + this.nodeHeightCenter + 9;
      }

      const centerLeftY = y2 + this.nodeHeightCenter;
      const centerLeftX = x2 - 15;
      const centerLeftDistance = Math.sqrt(Math.pow((x1 - centerLeftX), 2) + Math.pow((y1 - centerLeftY), 2));
      if (centerLeftDistance < minDistance) {
        minDistance = centerLeftDistance;
        x = centerLeftX;
        y = centerLeftY;
      }

      node.linkedPosition.left = x;
      node.linkedPosition.top = y;

      const centerRightY = y2 + this.nodeHeightCenter;
      const centerRightX = x2 + this.nodeWidthCenter + this.nodeWidthCenter + 15;
      const centerRightDistance = Math.sqrt(Math.pow((x1 - centerRightX), 2) + Math.pow((y1 - centerRightY), 2));
      if (centerRightDistance < minDistance) {
        minDistance = centerLeftDistance;
        x = centerRightX;
        y = centerRightY;
      }

      line.setAttribute('x1', x1.toString());
      line.setAttribute('y1', y1.toString());
      line.setAttribute('x2', x.toString());
      line.setAttribute('y2', y.toString());
      line.setAttribute('marker-end', 'url(#arrowhead)');

      parentElement.appendChild(line);
    });
  }

  defineRelationships(): void {
  }

  setSvgWidths(): void {

    this.nodeGraphContainer.nativeElement.style.width = this.parentGraphContainer.nativeElement.clientWidth;

    if (this.nodes == null) {
      return;
    }

    let maxLeft = 0;
    let maxTop = 0;
    this.nodes.forEach(node => {
      if (maxLeft < node.position.left) {
        maxLeft = node.position.left;
      }

      if (maxTop < node.position.top) {
        maxTop = node.position.top;
      }
    });

    if (maxLeft < this.centralNode.position.left) {
      maxLeft = this.centralNode.position.left;
    }

    if (maxTop < this.centralNode.position.top) {
      maxTop = this.centralNode.position.top;
    }

    this.svgContainer.nativeElement.style.minWidth = maxLeft + this.nodeWidthCenter + 10;
    this.svgContainer.nativeElement.style.minHeight = maxTop + this.nodeHeightCenter + 10;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setSvgWidths();
  }

  onDragStart(event: DragEvent, node) {
    this.startDragEvent = event;
    this.startDragNode = node;
  }

  onDragEnd(event: DragEvent) {
    if (this.startDragEvent == null || this.startDragNode == null) {
      return;
    }

    const xDiff = this.startDragEvent.clientX - event.clientX;
    const yDiff = this.startDragEvent.clientY - event.clientY;

    this.startDragNode.position.top = this.startDragNode.position.top - yDiff;
    this.startDragNode.position.left = this.startDragNode.position.left - xDiff;

    this.startDragNode.cssPosition = 'left: ' + this.startDragNode.position.left + 'px; top: ' + this.startDragNode.position.top + 'px;';

    this.defineLines();
    this.defineRelationships();
    this.setSvgWidths();

    this.startDragEvent = null;
    this.startDragNode = null;


  }

  openAsset(id, code) {
    const command = 'FORM[LOCATE:(ID=23;SELECTION-ID=' + id + '),TITLE: Composite Asset ' + code.replaceAll(':', '-') + ',TAB:new,SIDEBAR-STATUS:minimized]';
    this.navigatorService.navigate(command);
  }

  openAssetsListSelector() {
    const componentRefOnNavigation: ComponentRef<any> = this.commandNavigatorService.navigate(
      'POPUPLIST[LOCATE:(ID=29),RETURN:cf_id,FOCUS:header-filter-cf_name,DISPLAY:(rel_asset.name),REFRESH:rel_asset,HIDE-DELETE:YES]');
    componentRefOnNavigation.instance.setPresetCommand(
      'POPUPLIST[LOCATE:(ID=29),RETURN:cf_id,FOCUS:header-filter-cf_name,DISPLAY:(rel_asset.name),REFRESH:rel_asset,HIDE-DELETE:YES]');
    componentRefOnNavigation.instance.selectEmmiter.subscribe((returningValues: string[]) => {
      const id = returningValues['RETURN'];

      if (id == null) {
        return;
      }

      this.assetService.getAsset(id, 'ASSET').subscribe(dto => {

        const node = new Node();

        const x = (this.radius * 0.7) * Math.sin(Math.PI * 2 * this.newNodeAngle / 360);
        const y = (this.radius * 0.7) * Math.cos(Math.PI * 2 * this.newNodeAngle / 360);
        const left = (x + this.parentDivWidthCenterPosition);
        const top = (y + this.parentDivHeightCenterPosition);

        node.id = dto['id'];
        node.code = dto['code'];
        node.name = dto['name'];
        node.cssPosition = ('left: ' + left + 'px; top: ' + top + 'px;');
        node.cssClass = 'new-node';
        node.position.top = top;
        node.position.left = left;

        this.nodes.push(node);

        this.defineLines();
        this.defineRelationships();
        this.newNodeAngle += 30;

        this.service.insertRelated(this.centralNode.id, node.id).subscribe(atoa_id => {
          node.atoa_id = atoa_id;
        });

        this.setSvgWidths();
      });

    });
  }

  selectNode(node: Node) {
    this.selectedNode = node;
  }

  removeSelectedNode() {
    if (this.selectedNode === undefined || this.nodes === undefined) {
      return;
    }

    this.nodes =
      this.nodes.filter(item => item !== this.selectedNode);

    this.service.removeRelated(this.selectedNode.atoa_id).subscribe();

    this.defineRelationships();
    this.defineLines();
  }

  updateRelationship(relationship: any) {
    this.selectedRelNode.id = relationship['id'];
    this.selectedRelNode.code = relationship['code'];
    this.selectedRelNode.name = relationship['name'];
    this.selectedRelNode.node.relationship_id = relationship['id'];
    this.selectedRelNode.node.relationship_code = relationship['code'];
    this.selectedRelNode.node.relationship_name = relationship['name'];
    this.service.updateRelationship(this.selectedRelNode.node.atoa_id, this.selectedRelNode.code).subscribe();
  }

  selectRelNode(relNode: RelNode) {
    this.selectedRelNode = relNode;
  }

  trimString(str: String): String {

    if (str == null) {
      return '';
    }

    if (str.length > 16) {
      str = str.substring(0, 16) + '..';
    }
    return str;
  }

  navigateToNodeDiagram(node: Node) {
    this.saveAssetsPositions();
    let name = 'node-graph';
    if (this.router.url.startsWith('/node-graph?')) {
      name = 'node-graph-alt';
    }

    const command = 'STATICPAGE[NAME:' + name + ',LOCATE:(ID=' + node.id + '),TITLE:Graph]';
    this.navigatorService.navigate(command);
  }

  saveAssetsPositions() {
    const centralNodeDTO = new NodeDTO();
    centralNodeDTO.id = this.centralNode.id;
    centralNodeDTO.position = this.centralNode.position;
    centralNodeDTO.nodes = [];

    this.nodes.forEach(node => {
      const nodeDTO = new NodeDTO();
      nodeDTO.id = node.atoa_id;
      nodeDTO.position = node.position;
      centralNodeDTO.nodes.push(nodeDTO);
    });

    this.service.savePositions(centralNodeDTO).subscribe();
  }

  loadThreats(node: any) {
    this.selectedNode = node;
    this.service.getThreats(node.atoa_id).subscribe(dto => {
      this.threatsList = dto;
    });
  }

  saveThreatRelationshipProbability(relationship: any) {
    if (relationship['threat_propability'] == null) {
      return;
    }
    this.service.saveRelationshipProbability(relationship['id'], relationship['threat_propability']).subscribe();
  }

  saveThreatRelationshipActive(relationship: any) {
    if (relationship['active'] === true) {
      this.service.saveRelationshipActive(relationship['id'], 1).subscribe();
    } else {
      this.service.saveRelationshipActive(relationship['id'], 0).subscribe();
    }
  }

  openThreat(relationship: any) {
    const command = 'FORM[LOCATE:(ID=12;SELECTION-ID=' + relationship['threat_id'] + '),' +
      'TAB:new,SIDEBAR-STATUS:minimized,TITLE:Threat ' + relationship['code'].replaceAll(':', '-') + ']';
    this.navigatorService.navigate(command);
  }

  navigateToPreviousPage() {
    this.location.back();
  }
}
