import random
class Coord:
	def __init__(self, x, y):
		self.x = x
		self.y = y

class Vertex:
	def __init__(self, name):
		self.name = name 		# Identifier
		self.adj = [] 			# Adjacent vertices
		self.visited = False 	# If the vertex has been visited
		self.previsit = None	# Step in algorithm it was visited first
		self.postvisit = None	# Step in algorithm it was visited last
	def add(self, vertex):
		self.adj.append(vertex)

class Graph:
	def __init__(self, graph):
		self.height = len(graph)
		self.width = len(graph[0])
		self.edges = []
		self.cycles = []
		self.vertices = dict()
		
		# Make empty grid of cells
		for y in range (0, self.height+1):
			for x in range (0, self.width+1):
				self.vertices[str(x) + ", " + str(y)] = Vertex(str(x) + ", " + str(y))
		# Connect the dots
		for y in range(0, self.height):
			for x in range(0, self.width):
				if (graph[y][x] == '/'):
					self.vertices[str(x+1) + ", " + str(y)].add(self.vertices[str(x) + ", " + str(y+1)])
					#self.vertices[str(x) + ", " + str(y+1)].add(self.vertices[str(x+1) + ", " + str(y)])
				else:
					self.vertices[str(x) + ", " + str(y)].add(self.vertices[str(x+1) + ", " + str(y+1)])
					#self.vertices[str(x+1) + ", " + str(y+1)].add(self.vertices[str(x) + ", " + str(y)])
		# Parse Edges
		for y in range (0, self.height+1):
			for x in range (0, self.width+1):
				for v in self.vertices[str(x) + ", " + str(y)].adj:
					self.edges.append([self.vertices[str(x) + ", " + str(y)], v])
		# Find Cycles
		for edge in self.edges:
			for v in edge:
				self.findCycles([v])
				self.resetVisits()
		for cy in self.cycles:
			print str(len(cy)) + " vertex cycle found"
			print [c.name for c in cy]
		if (len(self.cycles) <= 0):
			print "No cycles found"
	def resetVisits(self):
		for edge in self.edges:
			for v in edge:
				v.visited = False
	def rotateToMin(self, path):
		n = path.index(min(path))
		return path[n:]+path[:n]
	def findCycles(self, path):
		vStart = path[0]
		if (vStart != None):
			if (vStart.visited):
				return
			vStart.visited = True
		vNext= None
		sub = []
		# Look through each vertex of each edge
		for edge in self.edges:
			v1, v2 = edge
			if (vStart in edge):
				if (v1 == vStart):
					vNext = v2
				else:
					vNext = v1
			# If Not visited
			if (not vNext in path):
				# Add adjacent vertex
				sub = [vNext]
				sub.extend(path)
				# Recurse through extended path
				self.findCycles(sub);
			elif (len(path) > 2  and vNext == path[-1]):
				# Cycle found
				p = self.rotateToMin(path);
				inv = self.rotateToMin(p[::-1])
				# If they are both 'new'
				if ((not p in self.cycles) and (not inv in self.cycles)):
					self.cycles.append(p)
def main():
    # Open file and read contents
	f = open('input.txt', 'r').read().splitlines()
	while (len(f) > 0):
		width, height = [int(i) for i in f[0].split()]
		f.pop(0)
		if (width == 0 and height == 0):
			return
		graph = []
		for y in range(0, height):
			graph.append(f[0])
			f.pop(0)
		print graph
		g = Graph(graph)

if __name__ == "__main__":
    main()