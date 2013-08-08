/**
 * Parses wiki syntax from a file and writes it back to the same file.
 *
 * Usage:
 *   node bin/wiki-parser.js <FILENAME>
 *
 * Where FILENAME is the full path to the file and the file has
 * a .tex extension.
 *
 * Supported Syntax:
 *   - Unordered List
 *   - Ordered List
 *   - Section, Subsection, Subsubsection
 *   - Horizontal line (replaced with empty.)
 *
 * Currently not supported:
 *   - Bold
 *   - Italic
 *   - and what else exists.
 */
var fs = require('fs')
	, http = require('http')
	, path = require('path');

var filename = process.argv[2]
	, dirname = path.dirname(filename);

var WIKI_URL = "http://wiki.ifs.hsr.ch/APF";

var ITEMIZE = /^[\*\-]{1}\s?([\S ]+)/
	, ENUMERATE = /\d\.\)?\s?([\S ]+)/
	, FIGURE = /http\:(?!\/)(.+)/i

	, SECTION = /^!!(?!\!)\s?([\S ]+)$/
	, SUBSECTION = /^!!!(?!\!)\s?([\S ]+)$/
	, SUBSUBSECTION = /^!!!!(?!\!)\s?([\S ]+)$/

	, HLINE = /----*/;

var patterns = [
	{regex: ITEMIZE, fun: itemize}
	, {regex: ENUMERATE, fun: enumerate}
	, {regex: FIGURE, fun: figure}
	, {regex: SECTION, fun: section}
	, {regex: SUBSECTION, fun: subsection}
	, {regex: SUBSUBSECTION, fun: subsubsection}
	, {regex: HLINE, fun: hline}
];

function itemize(lines, i, match, linePrefix) {
	linePrefix = linePrefix || "";
	var output = linePrefix + "\\begin{itemize}\n"
		+ linePrefix + "\t\\item " + match[1];
	for(var y = ++i, l = lines.length; y < l; y++) {
		var line = lines[y]
			, nextMatch = line.match(ITEMIZE);
		if(nextMatch) {
			output += "\n" + linePrefix + "\t\\item " + nextMatch[1];
		} else {
			i = y;
			break;
		}
	}
	output += "\n" + linePrefix + "\\end{itemize}\n";
	return {
		i: i
		, output: output
	};
}

function enumerate(lines, i, match) {
	var output = "\\begin{enumerate}\n\t\\item " + match[1];
	for(var y = ++i, l = lines.length; y < l; y++) {
		var line = lines[y];
		if(!line.length) {
			continue;
		}
		var nextMatch = line.match(ENUMERATE);
		if(nextMatch) {
			output += "\n\t\\item " + nextMatch[1];
		} else {
			var itemizeMatch = line.match(ITEMIZE);
			if(itemizeMatch) {
				output += "\n";
				var retVal = itemize(lines, y, itemizeMatch, "\t");
				y = retVal.i;
				i = y;
				output += retVal.output;
			} else {
				i = y;
				break;
			}
		}
	}
	output += "\n\\end{enumerate}\n";
	return {
		i: i
		, output: output
	};
}

function figure(lines, i, match) {
	var newFileName = match[1].replace('files', 'images'),
		caption = newFileName.replace('images/', '');

	caption = caption.replace(/\.(png|jpg|jpeg|gif)/i, '');
	caption = caption.replace(/[^a-z0-9_-]*/ig, '');
	caption = caption.replace(/-/g, ' ').replace(/_/g, ' ').trim();

	var output = "\\begin{figure}[H]\n\t\\centering\n";
	output += "\t\\includegraphics[width=\\textwidth]{"
		+ path.join(dirname, newFileName) + "}\n";
	output += "\t\\caption{" + caption + "}\n\\end{figure}\n";

	var newFile = path.join(dirname, newFileName);
	if(!fs.existsSync(newFile)) {
		var file = fs.createWriteStream(newFile);

		http.get(WIKI_URL + "/" + match[1], function(response) {
			response.pipe(file);
		});
	}

	return {
		i: i
		, output: output
	}
}

function section(lines, i, match) {
	return {
		i: i
		, output: "\\section{" + match[1] + "}\n"
	}
}
function subsection(lines, i, match) {
	return {
		i: i
		, output: "\\subsection{" + match[1] + "}\n"
	}
}
function subsubsection(lines, i, match) {
	return {
		i: i
		, output: "\\subsubsection*{" + match[1] + "}\n"
	}
}

function hline(lines, i, match) {
	return {
		i: i
		, output: ""
	}
}


var lines = fs.readFileSync(filename, "utf-8").split('\n')
	, output = ""
	, matched = false;

for (var i = 0, l = lines.length; i < l; i++){
	var currentLine = lines[i]
	matched = false;

	patterns.every(function(pattern) {
		var fun = pattern.fun
			, regex = pattern.regex;
		var match = currentLine.match(regex);
		if(match) {
			var retVal = fun(lines, i, match);
			i = retVal.i;
			output += retVal.output;
			matched = true;
			return false;
		}
		return true;
	});
	if(!matched) {
		if(currentLine.length) {
			output += currentLine;
		}
	}
	output += "\n";
};

var file = fs.createWriteStream(filename);
file.write(output);
file.end();