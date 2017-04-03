/**
 * A graph is just a large object with endpoints that
 * can be pressed with side effects.
 * This allows us to interact with the mutable nature
 * of d3 and force directed layouts within the clean
 * world of Redux.
 */
let d3 = require("d3");
let cola = require("./vendor/cola.min.js");
let levelgraph = require("levelgraph");
let level = require("level-browserify");

/**
 * Factory for creating the graph.
 * Returns an object with endpoints for interacting
 * with the graph.
 */
const graphFactory = (documentId) => {

    if (typeof documentId !== "string" || documentId === "") {
        throw new Error("Document Id passed into graph isn't a string.");
    }

    /**
     *  Options
     */
    let options = {
        // Set this as a function that transforms the node -> color string
        nodeToColor: undefined
    }

    /**
     * nodeMap allows hash lookup of nodes.
     */
    let nodeMap = new Map();
    let predicateTypeToColorMap = new Map();
    let tripletsDB = levelgraph(level(`Userdb-${Math.random()*100}`));
    let nodes = [];
    let links = [];

    const width = 900,
          height = 600,
          margin = 10,
          pad = 12;
    
    // Here we are creating a responsive svg element.
    let svg = d3.select(`#${documentId}`)
                .append("div")
                .classed("svg-container", true)
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${width} ${height}`)
                .classed("svg-content-responsive", true);


    /**
     * Set up [webcola](http://marvl.infotech.monash.edu/webcola/).
     * Later we'll be restarting the simulation whenever we mutate
     * the node or link lists.
     */
    let simulation = cola.d3adaptor(d3)
                         .avoidOverlaps(true)
                         .flowLayout('x', 150)
                         .jaccardLinkLengths(150)
                         .handleDisconnected(false) // THIS MUST BE FALSE OR GRAPH JUMPS
                         .size([width, height])
                         .nodes(nodes)
                         .links(links);
    
    /**
     * Here we define the arrow heads to be used later.
     * Each unique arrow head needs to be created.
     */
    const defs = svg.append("defs");

    /**
     * Appends a new marker to the dom, for the new
     * marker color.
     * @param {defs DOMElement} definitionElement 
     * @param {string} color valid css color string
     */
    const createColorMarker = (definitionElement, color) => {
        definitionElement.append("marker")
            .attr("id",`arrow-${color}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("fill", color)
            .attr("orient", "auto")
            .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .attr("class","arrowHead");
    }
    
    
    // Define svg groups
    let g = svg.append("g"),
        link = g.append("g")
                .selectAll(".link"),
        node = g.append("g")
                .selectAll(".node")

    /**
     * restart function adds and removes nodes.
     * It also restarts the simulation.
     * This is where aesthetics can be changed.
     */
    function restart(){
        /////// NODE ///////

        node = node.data(nodes, d => d.index);
        node.exit().remove();
        let nodeEnter = node.enter()
                   .append("g")
                   .each(d => {d.createMargin = false})
                   .classed("node", true)
                   .attr("cursor", "move")
                   .call(simulation.drag);
                   
        
        // Here we add node beauty.
        // To fit nodes to the short-name calculate BBox
        // from https://bl.ocks.org/mbostock/1160929
        let text = nodeEnter.append("text")
                    .attr("dx", -10)
                    .attr("dy", -2)
                    .attr("text-anchor", "middle")
                    .style("font", "100 22px Helvetica Neue")
                    .text(d => d.shortname || d.hash)
                    .each(function(d){
                        if (d.createMargin){
                            return
                        }
                        const b = this.getBBox();
                        const extra = 2 * margin + 2 * pad;
                        d.width = b.width + extra;
                        d.height = b.height + extra;
                        d.createMargin = !d.createMargin;
                    })
                    .attr("x", d => d.width / 2)
                    .attr("y", d => d.height / 2);

        nodeEnter.insert("rect", "text")     // The second arg is what the rect will sit behind.
                .classed("node", true)
                .attr("fill", d => options.nodeToColor && options.nodeToColor(d) || "red")
                .attr("rx", 5)
                .attr("ry", 5);
        
        node = node.merge(nodeEnter)

        /////// LINK ///////
        link = link.data(links, d => d.source.index + "-" + d.target.index)
        link.exit().remove();

        link = link.enter()
                   .append("path")
                   .attr("class", "line")
                   .attr("stroke-width", 2)
                   .attr("stroke", d => predicateTypeToColorMap.get(d.edgeData.type) || "black")
                   .attr("fill", "none")
                   .attr("marker-end",d => `url(#arrow-${predicateTypeToColorMap.get(d.edgeData.type)})`)   // This needs to change to the color.
                   .merge(link);
        
        /**
         * Helper function for drawing the lines.
         */
        const lineFunction = d3.line()
            .x(d => d.x)
            .y(d => d.y);

        /**
         * Causes the links to bend around the rectangles.
         * Source: https://github.com/tgdwyer/WebCola/blob/master/WebCola/examples/unix.html#L140
         */
        const routeEdges = function () {
            simulation.prepareEdgeRouting();
            link.attr("d", d => lineFunction(simulation.routeEdge(d)));
            if (isIE()) link.each(function (d) { this.parentNode.insertBefore(this, this) });
        }
        // Restart the simulation.
        simulation.links(links);    // Required because we create new link lists
        simulation.start(10, 15, 20).on("tick", function() {
            node.each(d => {
                    d.innerBounds = d.bounds.inflate(-margin);
                })
                .attr("transform", d => `translate(${d.innerBounds.x},${d.innerBounds.y})`);
            node.select('rect')
                .attr("width", d => d.innerBounds.width())
                .attr("height", d => d.innerBounds.height());

            link.attr("d", d => {
                let route = cola.makeEdgeBetween(d.source.innerBounds, d.target.innerBounds, 5);
                return lineFunction([route.sourceIntersection, route.arrowStart]);
            });
            if (isIE()) link.each(function (d) { this.parentNode.insertBefore(this, this) });

        }).on("end", routeEdges);
        function isIE() { return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); }
    }

    // Helper function for updating links after node mutations.
    // Calls a function after links added.
    function createNewLinks(){
        tripletsDB.get({}, (err, l) => {
            if (err){
                throw new Error(err);
            }
            // Create edges based on LevelGraph triplets
            links = l.map(({subject, object, edgeData}) => {
                let source = nodeMap.get(subject);
                let target = nodeMap.get(object);
                return { source, target, edgeData }
            });   
            restart()
        })
    }

    function addNode(nodeObject){
        // Check that hash exists
        if (!(nodeObject.hash)) {
            var e = new Error("Node requires a hash field.");
            console.error(e);
            return
        }

        // Add node to graph
        if (!nodeMap.has(nodeObject.hash)){
            // Set the node
            nodes.push(nodeObject)
            nodeMap.set(nodeObject.hash, nodeObject);
        }
        createNewLinks();
    }

    function addTriplet(tripletObject){
        /**
         * Check that minimum requirements are met.
         */
        if (tripletObject === undefined) {
            var e = new Error("TripletObject undefined");
            console.error(e);
            return
        }

        // Node needs a unique hash associated with it.
        let subject = tripletObject.subject,
            predicate = tripletObject.predicate,
            object = tripletObject.object;

        if (!(subject && predicate && object && true)){
            throw new Error("Triplets added need to include all three fields.")
        }

        // Check that hash exists
        if (!(subject.hash && object.hash)) {
            var e = new Error("Subject and Object require a hash field.");
            console.error(e);
            return
        }

        // Check that type field exists on predicate
        if (!predicate.type) {
            var e = new Error("Predicate requires type field.");
            console.error(e);
            return
        }

        // Check that type field is a string on predicate
        if (typeof predicate.type !== "string") {
            var e = new Error("Predicate type field must be a string");
            console.error(e);
            return
        }
        
        /**
         * If a predicate type already has a color,
         * it is not redefined.
         */
        if (!predicateTypeToColorMap.has(predicate.type)){
            predicateTypeToColorMap.set(predicate.type, predicate.color);

            // Create an arrow head for the new color
            createColorMarker(defs, predicate.color);
        }

        /**
         * Put the triplet into the LevelGraph database
         * and mutates the d3 nodes and links list to
         * visually pop on the node/s.
         */
        tripletsDB.put({
            subject: subject.hash,
            predicate: predicate.type,
            object: object.hash,
            edgeData: predicate
        }, err => {
            if (err){
                throw new Error(err);
            }
            
            // Add nodes to graph
            if (!nodeMap.has(subject.hash)){
                // Set the node
                nodes.push(subject)
                nodeMap.set(subject.hash, subject);
            }
            if (!nodeMap.has(object.hash)){
                nodes.push(object)
                nodeMap.set(object.hash, object);
            }

            createNewLinks();
        });
    }
    /**
     * Removes the node and all triplets associated with it.
     * @param {String} nodeHash hash of the node to remove.
     */
    function removeNode(nodeHash){
        tripletsDB.get({subject: nodeHash}, function(err, l1){
            if (err){
                return console.error(err)
            }
            tripletsDB.get({object: nodeHash}, function(err, l2){
                if (err){
                    return console.error(err)
                }
                // Check if the node exists
                if (l1.length + l2.length === 0){
                    return console.error("There was nothing to remove")
                }

                [...l1, ...l2].forEach(triplet => tripletsDB.del(triplet, function(err){
                    if (err){
                        return console.error(err);
                    }
                }));


                // Remove the node
                let nodeIndex = -1;
                for (let i = 0; i < nodes.length; i++){
                    if (nodes[i].hash === nodeHash){
                        nodeIndex = i;
                        break;
                    }
                }
                if (nodeIndex === -1){
                    return console.error("There is no node");
                }

                nodeMap.delete(nodeHash);
                nodes.splice(nodeIndex, 1);

                createNewLinks();
            });
        });
    }

    function setNodeToColor(nodeToColorFunc){
        options.nodeToColor = nodeToColorFunc;
    }

    return {
        addTriplet,
        removeNode,
        addNode,
        setNodeToColor
    }
}

export default graphFactory;
