
function GraphNode(key) {
    this.val = key;
}

function Graph(num_vertices) {
    this.num_vertices = num_vertices;
    this.curr_vertex_index = 0;
    this.vertices = new Array(num_vertices).fill(null);
    this.edges = new Array(num_vertices).fill(null);
    var dimension = Math.sqrt(num_vertices);
    for (var i = 0; i < dimension; i++) {
        this.edges[i] = new Array(dimension).fill(null);
    }
    this.path = new Array(num_vertices).fill(null);
    this.marks = new Array(num_vertices).fill(null);
}

Graph.prototype.add_vertex = function(key) {

    this.vertices[curr_vertex_index] = new GraphNode(key);     
    this.curr_vertex_index++;
}

// For algorithms that need to mark vertices (BFS, DFS), sets all the marks to be false
Graph.prototype.clear_marks = function() {

    for (var i = 0; i < this.num_vertices; i++) {
        this.marks[i] = false;
    }
}

//  Finds the location in the vertices array for predecessor vertex and current vertex. Updates the path array to reflect predecessor relationship.
Graph.prototype.update_predecessor = function(predecessor_vertex, current_vertex)
{
    var pred_index = 0;
    var curr_index = 0;
    for (var i = 0; i < this.num_vertices; i++)
    {
        if (this.vertices[i] == predecessor_vertex)
            pred_index = i;
        if (this.vertices[i] == currrent_vertex)
            curr_index = i;
    }
    if (this.path[curr_index] == null) {
        this.path[curr_index] = pred_index;
    }
}

// Sets the mark of this vertex to true
Graph.prototype.mark_vertex = function(vertex_index) {
    this.marks[vertex_index] = true;
}

// Returns boll in marks array for this vertex
Graph.prototype.is_marked = function(vertex_index) {
    return this.marks[vertex_index];
}

// Updates edges array to have edge weight
Graph.prototype.add_edge = function(origin_index, destination_index)
 {
     if (this.edges[origin_index][destination_index] == null) {
         this.edges[origin_index][destination_index] = 1;
     }
}

// Finds all neighbors of the given vertex and enqueues into passed queue
Graph.prototype.get_to_vertices = function(origin_index, queue) 
 {
    for (var i = 0; i < this.num_vertices; i++) {
        if (this.edges[origin_index][i] != null) {
            if (origin_index != i) {
                queue.enqueue(i);
            }
        }
    }
}

// Takes in Vertex object and iterates through the vertices array to find that object.  Return true if found, false otherwise.
Graph.prototype.is_value_in_graph = function(vertex_value) 
{
    var found = false;
    for (var i = 0; i < num_vertices; i++)
        if (vertex_value == this.vertices[i]) {
            found = true;
        }

    return found;
}

Graph.prototype.remove_mark = function(vertex_index){
    this.marks[vertex_index] = false;
}



