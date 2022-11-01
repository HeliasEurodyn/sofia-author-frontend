import {AfterContentInit, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit, AfterContentInit {

  // private data = [
  //   {'Framework': 'Vue', 'Stars': '166443', 'Released': '2014'},
  //   {'Framework': 'React', 'Stars': '150793', 'Released': '2013'},
  //   {'Framework': 'Angular', 'Stars': '62342', 'Released': '2016'},
  //   {'Framework': 'Backbone', 'Stars': '27647', 'Released': '2010'},
  //   {'Framework': 'Ember', 'Stars': '21471', 'Released': '2011'},
  // ];
  // private svg;
  private margin = 50;
  private countTicks = 0;
  // private width = 750 - (this.margin * 2);
  // private height = 400 - (this.margin * 2);


  // ngOnInit(): void {
  // }
  //
  // ngAfterContentInit(): void {
  //  // this.createSvg();
  //  // this.drawBars(this.data);
  // }


  title = 'ng-d3-graph-editor';
  // @ViewChild('graphContainer') graphContainer: ElementRef;

  width = 960;
  height = 600;
  colors = d3.scaleOrdinal(d3.schemeCategory10);

  svg: any;
  force: any;
  path: any;
  pathText: any;
  circle: any;
  drag: any;
  dragLine: any;


  // mouse event vars
  selectedNode = null;
  selectedLink = null;
  mousedownLink = null;
  mousedownNode = null;
  mouseupNode = null;

  lastNodeId = 2;
  // only respond once per keydown
  lastKeyDown = -1;

  nodes = [
    {id: 0, reflexive: false, labelText: 'snoqualmiecoin'},
    {id: 1, reflexive: true, labelText: 'My Mac Laptop'},
    {id: 2, reflexive: false, labelText: 'corntree'},
    {id: 33, reflexive: false, labelText: 'My Mac Laptop 2'},
    {id: 27, reflexive: false, labelText: 'My Desktop'},
    {id: 28, reflexive: false, labelText: 'My Desktop'},
    {id: 29, reflexive: false, labelText: 'My Desktop'},
    // {id: 29, reflexive: false, labelText: 'My Desktop'}
  ];
  links = [
    {source: this.nodes[0], target: this.nodes[1], left: false, right: true, labelText: 'Is installed on'},
    {source: this.nodes[1], target: this.nodes[2], left: false, right: true, labelText: 'Is connected to'},
    {source: this.nodes[1], target: this.nodes[3], left: false, right: true, labelText: 'Is part of'},

    {source: this.nodes[4], target: this.nodes[5], left: false, right: true, labelText: 'Is used by'},
    {source: this.nodes[4], target: this.nodes[6], left: false, right: true, labelText: 'Is part of'},
    {source: this.nodes[1], target: this.nodes[6], left: false, right: true, labelText: 'Is part of'}
  ];

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.initialisationGrapheA();
  }


  // initialisationGrapheB() {
  //
  //   this.svg = d3.select('#graphContainer').append('svg')
  //     .attr('width', '100%')
  //     .attr('height', (window.innerHeight - 80));
  //
  //
  //   const color = d3.scaleIdentity();
  //
  //   this.force = d3.layout.force() //initialisation de la force
  //     .nodes(nodes)
  //     .links(links)
  //     .charge(-1e3)
  //     .linkDistance(60)
  //     .chargeDistance(-600)
  //     .size([$('#divSVG').width(), (window.innerHeight - 100)])
  //     .on('tick', tick)
  //
  //   //background derriere les link label
  //   svg.html('<defs><filter x="-0.1" y="0" width="1.2" height="1" id="solid"><feFlood flood-color="white"/><feComposite in="SourceGraphic"/></filter></defs>');
  // }

  initialisationGrapheA() {
    // const rect = this.graphContainer.nativeElement.getBoundingClientRect();
    // console.log(rect.width, rect.height);

    // this.width = '500 px';
    // const labelText = this.svg.selectAll('.labelText')
    //   .data(force.links())
    //   .enter().append('text')
    //   .attr('class', 'labelText')
    //   .attr('dx', 20)
    //   .attr('dy', 0)
    //   .style('fill', 'red')
    //   .append('textPath')
    //   .attr('xlink:href', function(d, i) { return '#linkId_' + i; })
    //   .text(function(d, i) { return 'text for link ' + i; });

    this.svg = d3.select('#graphContainer')
      .attr('oncontextmenu', 'return false;')
      .attr('width', this.width)
      .attr('height', this.height);

    this.force = d3.forceSimulation()
      //  .force('link', d3.forceLink().id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('x', d3.forceX(this.width / 2))
      .force('y', d3.forceY(this.height / 2))
      .on('tick', () => this.tick());

    // init D3 drag support
    // this.drag = d3.drag()
    //   .on('start', (event, d: any) => {
    //     if (!event.active) {
    //       this.force.alphaTarget(0.3).restart();
    //     }
    //
    //     d.fx = d.x;
    //     d.fy = d.y;
    //   })
    //   .on('drag', (event, d: any) => {
    //     d.fx = event.x;
    //     d.fy = event.y;
    //   })
    //   .on('end', (event, d: any) => {
    //     if (!event.active) {
    //       this.force.alphaTarget(0.3);
    //     }
    //
    //     d.fx = null;
    //     d.fy = null;
    //   });

    // define arrow markers for graph links
    this.svg.append('svg:defs').append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 6)
      .attr('markerWidth', 3)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#5f5f5f');

    this.svg.append('svg:defs').append('svg:marker')
      .attr('id', 'start-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 4)
      .attr('markerWidth', 3)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M10,-5L0,0L10,5')
      .attr('fill', '#5f5f5f');

    // line displayed when dragging new nodes
    // this.dragLine = this.svg.append('svg:path')
    //   .attr('class', 'link dragline hidden')
    //   .attr('d', 'M0,0L0,0');

    // handles to link and node element groups
    this.path = this.svg.append('svg:g')
      .selectAll('path');

    this.pathText = this.svg.selectAll('.pathtext');

    // this.path =  this.svg.append('svg:g')
    //   .selectAll('line')
    //  // .data(force.links())
    //   .enter().append('svg:path')
    //   .attr('class', 'link')
    //   .style('stroke-width', 1)
    //   .style('stroke', '#ff0000');

    this.circle = this.svg.append('svg:g').selectAll('g');

    // app starts here
    this.svg.on('mousedown', (event, dataItem, value, source) => this.mousedown(event, dataItem, value, source))
      .on('mousemove', (event, dataItem) => this.mousemove(event, dataItem))
      .on('mouseup', (event, dataItem) => this.mouseup(dataItem));
    d3.select(window)
      .on('keydown', this.keydown)
      .on('keyup', this.keyup);
    this.restart();
  }

  // update force layout (called automatically each iteration)
  tick() {

    if ( this.countTicks > 700 ) {
      return;
    }
    // draw directed edges with proper padding from node centers
    this.path.attr('d', (d: any) => {
      const deltaX = d.target.x - d.source.x;
      const deltaY = d.target.y - d.source.y;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const normX = deltaX / dist;
      const normY = deltaY / dist;
      const sourcePadding = d.left ? 27 : 22;
      const targetPadding = d.right ? 27 : 22;
      const sourceX = d.source.x + (sourcePadding * normX);
      const sourceY = d.source.y + (sourcePadding * normY);
      const targetX = d.target.x - (targetPadding * normX);
      const targetY = d.target.y - (targetPadding * normY);

      return `M${sourceX},${sourceY}L${targetX},${targetY}`;
    });

    this.pathText.attr('transform', function (d) {
      const angle = Math.atan((d.source.y - d.target.y) / (d.source.x - d.target.x)) * 180 / Math.PI;
      return 'translate(' + [((d.source.x + d.target.x) / 2), ((d.source.y + d.target.y) / 2)] + ')rotate(' + angle + ')';
    });

    this.circle.attr('transform', (d) => `translate(${d.x},${d.y})`);
    this.countTicks ++;
  }

  resetMouseVars() {
    this.mousedownNode = null;
    this.mouseupNode = null;
    this.mousedownLink = null;
  }

  // update graph (called when needed)
  restart() {
    // path (link) group
    this.path = this.path.data(this.links);
    this.pathText = this.pathText.data(this.links);
    // update existing links
    // this.path.classed('selected', (d) => d === this.selectedLink)
    //   .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
    //   .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')

    // const linkLabel = this.path.append('text')
    //   .attr('class', 'linkLabel')
    //   .attr('dy', 5)
    //   .attr('filter', 'url(#solid)')
    //   .text(function (d) {
    //     return d.type;
    //   });

    // remove old links
    this.path.exit().remove();
    this.pathText.exit().remove();
    // add new link text
    // this.path = this.path.enter().append('svg:text')
    //   .attr('class', 'labelText')
    //   .merge(this.path);

    // add new links
    this.path = this.path.enter().append('svg:path')
      .attr('class', 'link')
      .classed('selected', (d) => d === this.selectedLink)
      .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
      .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')
      // .on('mousedown', (d) => {
      //   // if (d3.event.ctrlKey) return;
      //   // select link
      //   this.mousedownLink = d;
      //   this.selectedLink = (this.mousedownLink === this.selectedLink) ? null : this.mousedownLink;
      //
      //   this.selectedNode = null;
      //   this.restart();
      // })
      .merge(this.path);

    this.pathText = this.pathText.enter().append('text')
      .text((d) => d.labelText)
      .classed('labelText', true)
      .classed('pathtext', true)
      .attr('y', -4)
      .merge(this.pathText);

    // this.pathText = this.pathText.enter().append('text')
    //   .text((d) => d.labelText)
    //   .classed('labelText', true)
    //   .merge(this.pathText);


    // g.append('svg:text')
    //   .attr('x', 0)
    //   .attr('y', 4)
    //   .attr('class', 'labelText')
    //   .text((d) => d.labelText);

    // this.path.enter().append('svg:text')
    //   .attr('x', 0)
    //   .attr('y', 4)
    //   .attr('class', 'labelText')
    //   .text((d) => d.labelText);

    // console.log('Hello');
    // console.log(this.path);
    // this.path = this.path.selectAll('svg:path')
    //  // .data(this.links)
    //   .enter().append('text')
    //   .attr('class', 'labelText')
    //   .attr('dx', 20)
    //   .attr('dy', 0)
    //   .style('fill', 'red')
    //   .append('textPath')
    //   .attr('xlink:href', function(d, i) { return '#linkId_' + i; })
    //   .text(function(d, i) { return 'text for link ' + i; });

    // circle (node) group
    // NB: the function arg is crucial here! nodes are known by id, not by index!
    this.circle = this.circle.data(this.nodes, (d) => d.id);

    // update existing nodes (reflexive & selected visual states)
    this.circle.selectAll('circle')
      // .call(this.force.drag)
      .style('fill', (d) => (d === this.selectedNode) ? d3.rgb(this.colors(d.id)).brighter().toString() : this.colors(d.id))
      .classed('reflexive', (d) => d.reflexive);

    // remove old nodes
    this.circle.exit().remove();

    // add new nodes
    const g = this.circle.enter().append('svg:g');

    g.append('svg:circle')
      .attr('class', 'node')
      .attr('r', (d) => d.labelText.toString().length * 2)
        .style('fill', (d) => (d === this.selectedNode) ? d3.rgb(this.colors(d.id)).brighter().toString() : this.colors(d.id))
        .style('stroke', (d) => d3.rgb(this.colors(d.id)).darker().toString())
        .classed('reflexive', (d) => d.reflexive)
        // .on('mouseover', function (d) {
        //   if (!this.mousedownNode || d === this.mousedownNode) {
        //     return;
        //   }
        //   // enlarge target node
        //   d3.select(this).attr('transform', 'scale(1.1)');
        // })
        .on('mouseout', function (d) {
          if (!this.mousedownNode || d === this.mousedownNode) {
            return;
          }
          // unenlarge target node
          d3.select(this).attr('transform', '');
        })
        .on('mousedown', (event, d) => {
          if (event.ctrlKey) {
            return;
          }

          // select node
          this.mousedownNode = d;
          this.selectedNode = (this.mousedownNode === this.selectedNode) ? null : this.mousedownNode;
          this.selectedLink = null;

          // reposition drag line
          // this.dragLine
          //   .style('marker-end', 'url(#end-arrow)')
          //   .classed('hidden', false)
          //   .attr('d', `M${this.mousedownNode.x},${this.mousedownNode.y}L${this.mousedownNode.x},${this.mousedownNode.y}`);

          this.restart();
        })
        .on('mouseup', (event, dataItem: any) => {
          // debugger;
          if (!this.mousedownNode) {
            return;
          }

          // needed by FF
          // this.dragLine
          //   .classed('hidden', true)
          //   .style('marker-end', '');

          // check for drag-to-self
          this.mouseupNode = dataItem;
          if (this.mouseupNode === this.mousedownNode) {
            this.resetMouseVars();
            return;
          }

          // unenlarge target node
          d3.select(event.currentTarget).attr('transform', '');

          // add link to graph (update if exists)
          // NB: links are strictly source < target; arrows separately specified by booleans
          const isRight = this.mousedownNode.id < this.mouseupNode.id;
          const source = isRight ? this.mousedownNode : this.mouseupNode;
          const target = isRight ? this.mouseupNode : this.mousedownNode;

          const link = this.links.filter((l) => l.source === source && l.target === target)[0];
          if (link) {
            link[isRight ? 'right' : 'left'] = true;
          } else {
            this.links.push({source, target, left: !isRight, right: isRight, labelText: 'hello'});
          }

          // select new link
          this.selectedLink = link;
          this.selectedNode = null;
          this.restart();
        });

    // show node IDs
    g.append('svg:text')
      .attr('x', 0)
      .attr('y', 4)
      // .attr('class', 'labelText')
      // .attr('class', 'nodeText')
      .classed('labelText', true)
      .classed('nodeText', true)
      .text((d) => d.labelText);

    // .enter().append('text')
    //     .attr('class', 'labelText')

    // g.select('svg:text')
    //
    //   .attr('class', 'labelText')
    //   .attr('dx', 20)
    //   .attr('dy', 0)
    //   .style('fill', 'red')
    //   .append('textPath')
    //   .attr('xlink:href', function(d, i) { return '#linkId_' + i; })
    //   .text(function(d, i) { return 'text for link ' + i; });

    this.circle = g.merge(this.circle);

    // set the graph in motion
    this.force
      .nodes(this.nodes);
    // .force('link').links(this.links);

    this.force.alphaTarget(0.3).restart();
  }

  mousedown(event, dataItem: any, value: any, source: any) {
    // // because :active only works in WebKit?
    this.svg.classed('active', true);

    if (event.ctrlKey || this.mousedownNode || this.mousedownLink) {
      return;
    }

    // insert new node at point
    const point = d3.pointer(event.currentTarget);
    // const point = d3.mouse(this);
    const node = {id: ++this.lastNodeId, reflexive: false, x: point[0], y: point[1]};
    //  this.nodes.push(node);

    this.restart();
  }

  mousemove(event, source: any) {
    if (!this.mousedownNode) {
      return;
    }

    // update drag line
    this.dragLine.attr('d', `M${this.mousedownNode.x},
    ${this.mousedownNode.y}L${d3.pointer(event.currentTarget)[0]},${d3.pointer(event.currentTarget)[1]}`);

    this.restart();
  }

  mouseup(source: any) {
    if (this.mousedownNode) {
      // hide drag line
      this.dragLine
        .classed('hidden', true)
        .style('marker-end', '');
    }

    // because :active only works in WebKit?
    this.svg.classed('active', false);

    // clear mouse event vars
    this.resetMouseVars();
  }

  spliceLinksForNode(node) {
    const toSplice = this.links.filter((l) => l.source === node || l.target === node);
    for (const l of toSplice) {
      this.links.splice(this.links.indexOf(l), 1);
    }
  }

  keydown(event) {
    event.preventDefault();

    if (this.lastKeyDown !== -1) {
      return;
    }
    this.lastKeyDown = event.keyCode;

    // ctrl
    if (event.keyCode === 17) {
      this.circle.call(this.drag);
      this.svg.classed('ctrl', true);
    }

    if (!this.selectedNode && !this.selectedLink) {
      return;
    }

    switch (event.keyCode) {
      case 8: // backspace
      case 46: // delete
        if (this.selectedNode) {
          this.nodes.splice(this.nodes.indexOf(this.selectedNode), 1);
          this.spliceLinksForNode(this.selectedNode);
        } else if (this.selectedLink) {
          this.links.splice(this.links.indexOf(this.selectedLink), 1);
        }
        this.selectedLink = null;
        this.selectedNode = null;
        this.restart();
        break;
      case 66: // B
        if (this.selectedLink) {
          // set link direction to both left and right
          this.selectedLink.left = true;
          this.selectedLink.right = true;
        }
        this.restart();
        break;
      case 76: // L
        if (this.selectedLink) {
          // set link direction to left only
          this.selectedLink.left = true;
          this.selectedLink.right = false;
        }
        this.restart();
        break;
      case 82: // R
        if (this.selectedNode) {
          // toggle node reflexivity
          this.selectedNode.reflexive = !this.selectedNode.reflexive;
        } else if (this.selectedLink) {
          // set link direction to right only
          this.selectedLink.left = false;
          this.selectedLink.right = true;
        }
        this.restart();
        break;
    }
  }

  keyup(event) {
    this.lastKeyDown = -1;

    // ctrl
    if (event.keyCode === 17) {
      this.circle.on('.drag', null);
      this.svg.classed('ctrl', false);
    }
  }


  private createSvg(): void {
    this.svg = d3.select('figure#bar')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.Framework))
      .attr('y', d => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.Stars))
      .attr('fill', '#d04a35');
  }


  // testIt() {
  //   this.reportService.testIt().subscribe(response => {
  //     this.saveFile(response.body, 'market-data.pdf');
  //   });
  // }
  //
  // saveFile(downloadedData: any, filename?: string) {
  //   const blob = new Blob([downloadedData], {type: 'application/pdf'});
  //   const url = window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

}
