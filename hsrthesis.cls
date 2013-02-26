\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{hsrthesis}[2012/06/06 A LaTex template for HSR Thesis]
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{report}}
\ProcessOptions

\LoadClass[a4paper]{report}
\RequirePackage{graphicx}
\newcommand{\nothing}{}


% Including mostly used packages
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{textcomp}
\usepackage{mathptmx}
\usepackage[scaled=0.85]{helvet}
\usepackage{hyperref}
\usepackage{array}
\usepackage{ngerman}
\usepackage{glossaries}
\usepackage{color}
\usepackage{listings} \lstset{backgroundcolor=\color{lightgray}} \lstset{language=Java}
\usepackage{wrapfig}
\usepackage{url}
\usepackage{float}
\usepackage{natbib}
\usepackage{booktabs}
\usepackage{tabularx}
\definecolor{lightgray}{rgb}{.9,.9,.9}
\usepackage{pdfpages}


% Sylings for Tables
%%%%%%%%%%%%%%%%%%%%
\newcommand*\heading[1]{\bfseries{#1}}
\newcommand*\beforeheading{\toprule}
\newcommand*\afterheading{\midrule}
\newcommand*\normalline{}
\newcommand*\lastline{\bottomrule}



% Titlepage
%%%%%%%%%%%

\if@titlepage
	\renewcommand{\maketitle}{
		\begin{titlepage}
		% title
			\begin{center}
				\huge\thesistitle\\[2ex]
				\normalsize\thedate
				\vfill
			\end{center}
		\end{titlepage}
	}
\else
	\renewcommand{\maketitle}{%
		\begin{flushleft}
			\null\hfill
			\vskip 2cm
			\sffamily\bfseries\upshape\huge
			\@title\\
			\mdseries\upshape\large
			\vspace{.5em}%
			\@author, \@date\\
			% \rule{\textwidth}{.5mm}\\
		\end{flushleft}
		\@thanks
		\par
		\vskip 1cm
	}
\fi