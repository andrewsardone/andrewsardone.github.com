---
layout: post
title: Quick Thoughts on Interface Builder
---

On the train ride from Chicago to Ann Arbor, [Justin William's](http://carpeaqua.com) [tweets](https://twitter.com/#!/justinw/status/44868163288051712) [regarding](https://twitter.com/#!/justinw/status/44870801224241152) Interface Builder made me stop and think.

  > Recommending someone not use Interface Builder when learning iOS development in 2011 is insane, unless you enjoy writing extra code. 
  
  > Every project I've ever written has used Interface Builder. Less code = more gooder

There are many benefits to using Interface Builder (visual layout, quick simulation, etc.), but I wanted to think about William's 'less code' point.

Now, if we take 'code' here to strictly mean C/Objective-C code, then yes, view objects that are laid out in Interface Builder use less code. In fact, by this definition, they don't use _any_ amount of code. But I'd say XIBs are code. A XIB file is an XML document representing serialized objects (views, controllers, their respective outlet connections, etc.) which is deserialized at runtime. And these documents consist of a lot of (practically) unreadable XML. Generate a project from Xcode's View-based Application template. The generated XIB for your initial `UIViewController` is 156 lines of XML. This XIB simply creates a full-screen root view with a gray background and other defaults. Let's take a look at how much code this requires if implemented directly within your `UIViewController`:

<!-- Using gists instead of <code> blocks
- (void)loadView
{
    UIView *rootView = [[[UIView alloc] initWithFrame:(CGRect){{0,  {320, 460}}] autorelease];
    rootView.backgroundColor = olor colorWithWhite:0.750 alpha:1.000];
    self.view = rootView;
}
-->

<script src="https://gist.github.com/861371.js?file=gistfile1.m"></script>

Four to six lines of code that, to me, are actually readable. Now, I don't get to see the nice visual layout, but when compared to reading the XIB's XML, this is a breeze. I'm dealing with objects and setting properties on them in the same manner I do everywhere else in the project.

But Andrew, you don't manipulate a XIB's XML directly. Instead, you rely on Interface Builder and its GUI to write changes to the XIB file. There's a translation layer, so comparing the `-loadView` chunk of code with the 156 lines of XML is foolish.

It is here that I see a problem. I don't know about you, but a decent chunk of my development time is spent in version control looking at diffs. Whether I'm reviewing a co-worker's set of changes or digging through the project's history, I'm dealing with changesets and their relevant diffs.

Look at the following two git commits. Each changeset implements the exact same thing: adding a functionless button.

The first is done in code:

<!-- Using gists instead of <code> blocks
commit 95628482b41844ad0fa22956644b0d38d18c4a75
Author: Andrew Sardone <asardone@nutshell.com>
Date:   Tue Mar 8 13:13:24 2011 -0600

    Added a simple button

diff --git a/ViewLayouts/ViewLayoutsViewController.m ewLayouts/ViewLayoutsViewController.m
index 13bef1d..de8c439 100644
--- a/ViewLayouts/ViewLayoutsViewController.m
+++ b/ViewLayouts/ViewLayoutsViewController.m
@@ -31,6 +31,11 @@
     UIView *rootView = [[[UIView alloc] WithFrame:(CGRect){{0, 20}, {320, 460}}] autorelease];
     rootView.backgroundColor = olor colorWithWhite:0.750 alpha:1.000];
     self.view = rootView;
+    
+    UIButton *button = utton buttonWithType:UIButtonTypeRoundedRect];
+    button.frame = (CGRect) {{20, 20}, {280, 37}};
+    [button setTitle:@"Hello" forState:UIControlStateNormal];
+    [self.view addSubview:button];
 }
 
 /*
-->

<script src="https://gist.github.com/861371.js?file=gistfile2.diff"></script>

The second via Interface Builder:

<!-- Using gists instead of <code> blocks
commit 0701fdfdc05fbf079bd72ba1a9affd59a9672754
Author: Andrew Sardone <asardone@nutshell.com>
Date:   Tue Mar 8 12:50:25 2011 -0600

    Added a simple button

diff --git a/ViewLayouts/en.lproj/ViewLayoutsViewController.xib ewLayouts/en.lproj/ViewLayoutsViewController.xib
index bb99fd3..db5c9ff 100644
--- a/ViewLayouts/en.lproj/ViewLayoutsViewController.xib
+++ b/ViewLayouts/en.lproj/ViewLayoutsViewController.xib
@@ -1,18 +1,20 @@
 <?xml version="1.0" encoding="UTF-8"?>
 <archive type="com.apple.InterfaceBuilder3.CocoaTouch.XIB" ion="7.10">
 	<data>
-		<int key="IBDocument.SystemTarget">800</int>
-		<string key="IBDocument.SystemVersion">10C540</string>
-		<string key="IBDocument.InterfaceBuilderVersion">759</string>
-		<string key="IBDocument.AppKitVersion">1038.25</string>
-		<string key="IBDocument.HIToolboxVersion">458.00</string>
+		<int key="IBDocument.SystemTarget">1056</int>
+		<string key="IBDocument.SystemVersion">10J567</string>
+		<string key="IBDocument.InterfaceBuilderVersion">1305</string>
+		<string key="IBDocument.AppKitVersion">1038.35</string>
+		<string key="IBDocument.HIToolboxVersion">462.00</string>
 		<object class="NSMutableDictionary" "IBDocument.PluginVersions">
 			<string "NS.key.0">com.apple.InterfaceBuilder.IBCocoaTouchPlugin</string>
-			<string key="NS.object.0">77</string>
+			<string key="NS.object.0">300</string>
 		</object>
-		<object class="NSMutableArray" "IBDocument.EditedObjectIDs">
+		<object class="NSArray" "IBDocument.IntegratedClassDependencies">
 			<bool key="EncodedWithXMLCoder">YES</bool>
-			<integer value="6"/>
+			<string>IBProxyObject</string>
+			<string>IBUIView</string>
+			<string>IBUIButton</string>
 		</object>
 		<object class="NSArray" key="IBDocument.PluginDependencies">
 			<bool key="EncodedWithXMLCoder">YES</bool>
@@ -23,9 +25,7 @@
 			<object class="NSArray" key="dict.sortedKeys" id="0">
 				<bool key="EncodedWithXMLCoder">YES</bool>
 			</object>
-			<object class="NSMutableArray" key="dict.values">
-				<bool key="EncodedWithXMLCoder">YES</bool>
-			</object>
+			<reference key="dict.values" ref="0"/>
 		</object>
 		<object class="NSMutableArray" key="IBDocument.RootObjects" 1000">
 			<bool key="EncodedWithXMLCoder">YES</bool>
@@ -40,8 +40,44 @@
 			<object class="IBUIView" id="774585933">
 				<reference key="NSNextResponder"/>
 				<int key="NSvFlags">274</int>
-				<string key="NSFrameSize">{320, 460}</string>
+				<object class="NSMutableArray" key="NSSubviews">
+					<bool key="EncodedWithXMLCoder">YES</bool>
+					<object class="IBUIButton" id="800158532">
+						<reference key="NSNextResponder" ref="774585933"/>
+						<int key="NSvFlags">292</int>
+						<string key="NSFrame">{{20, 20}, {280, 37}}</string>
+						<reference key="NSSuperview" ref="774585933"/>
+						<reference key="NSWindow"/>
+						<reference key="NSNextKeyView"/>
+						<bool key="IBUIOpaque">NO</bool>
+						<string "targetRuntimeIdentifier">IBCocoaTouchFramework</string>
+						<int key="IBUIContentHorizontalAlignment">0</int>
+						<int key="IBUIContentVerticalAlignment">0</int>
+						<object class="NSFont" key="IBUIFont">
+							<string key="NSName">Helvetica-Bold</string>
+							<double key="NSSize">15</double>
+							<int key="NSfFlags">16</int>
+						</object>
+						<int key="IBUIButtonType">1</int>
+						<string key="IBUINormalTitle">Hello</string>
+						<object class="NSColor" "IBUIHighlightedTitleColor">
+							<int key="NSColorSpace">3</int>
+							<bytes key="NSWhite">MQA</bytes>
+						</object>
+						<object class="NSColor" key="IBUINormalTitleColor">
+							<int key="NSColorSpace">1</int>
+							<bytes "NSRGB">MC4xOTYwNzg0MzQ2IDAuMzA5ODAzOTMyOSAwLjUyMTU2ODY1NgA</bytes>
+						</object>
+						<object class="NSColor" "IBUINormalTitleShadowColor">
+							<int key="NSColorSpace">3</int>
+							<bytes key="NSWhite">MC41AA</bytes>
+						</object>
+					</object>
+				</object>
+				<string key="NSFrame">{{0, 20}, {320, 460}}</string>
 				<reference key="NSSuperview"/>
+				<reference key="NSWindow"/>
+				<reference key="NSNextKeyView" ref="800158532"/>
 				<object class="NSColor" key="IBUIBackgroundColor">
 					<int key="NSColorSpace">3</int>
 					<bytes key="NSWhite">MC43NQA</bytes>
@@ -89,8 +125,17 @@
 					<object class="IBObjectRecord">
 						<int key="objectID">6</int>
 						<reference key="object" ref="774585933"/>
+						<object class="NSMutableArray" key="children">
+							<bool key="EncodedWithXMLCoder">YES</bool>
+							<reference ref="800158532"/>
+						</object>
 						<reference key="parent" ref="0"/>
 					</object>
+					<object class="IBObjectRecord">
+						<int key="objectID">8</int>
+						<reference key="object" ref="800158532"/>
+						<reference key="parent" ref="774585933"/>
+					</object>
 				</object>
 			</object>
 			<object class="NSMutableDictionary" "flattenedProperties">
@@ -101,6 +146,7 @@
 					<string>-2.CustomClassName</string>
 					<string>6.IBEditorWindowLastContentRect</string>
 					<string>6.IBPluginDependency</string>
+					<string>8.IBPluginDependency</string>
 				</object>
 				<object class="NSMutableArray" key="dict.values">
 					<bool key="EncodedWithXMLCoder">YES</bool>
@@ -108,25 +154,22 @@
 					<string>UIResponder</string>
 					<string>{{239, 654}, {320, 480}}</string>
 					<string>com.apple.InterfaceBuilder.IBCocoaTouchPlugin</string>
+					<string>com.apple.InterfaceBuilder.IBCocoaTouchPlugin</string>
 				</object>
 			</object>
 			<object class="NSMutableDictionary" "unlocalizedProperties">
 				<bool key="EncodedWithXMLCoder">YES</bool>
 				<reference key="dict.sortedKeys" ref="0"/>
-				<object class="NSMutableArray" key="dict.values">
-					<bool key="EncodedWithXMLCoder">YES</bool>
-				</object>
+				<reference key="dict.values" ref="0"/>
 			</object>
 			<nil key="activeLocalization"/>
 			<object class="NSMutableDictionary" key="localizations">
 				<bool key="EncodedWithXMLCoder">YES</bool>
 				<reference key="dict.sortedKeys" ref="0"/>
-				<object class="NSMutableArray" key="dict.values">
-					<bool key="EncodedWithXMLCoder">YES</bool>
-				</object>
+				<reference key="dict.values" ref="0"/>
 			</object>
 			<nil key="sourceID"/>
-			<int key="maxID">7</int>
+			<int key="maxID">8</int>
 		</object>
 		<object class="IBClassDescriber" key="IBDocument.Classes">
 			<object class="NSMutableArray" "referencedPartialClassDescriptions">
@@ -136,7 +179,7 @@
 					<string key="superclassName">UIViewController</string>
 					<object class="IBClassDescriptionSource" "sourceIdentifier">
 						<string key="majorKey">IBProjectSource</string>
-						<string "minorKey">ViewLayoutsViewController.h</string>
+						<string "minorKey">./Classes/ViewLayoutsViewController.h</string>
 					</object>
 				</object>
 			</object>
@@ -148,9 +191,7 @@
 			<integer value="3100" key="NS.object.0"/>
 		</object>
 		<bool "IBDocument.PluginDeclaredDependenciesTrackSystemTargetVersion">YES</bool>
-		<string "IBDocument.LastKnownRelativeProjectPath">ViewLayouts.xcodeproj</string>
 		<int key="IBDocument.defaultPropertyAccessControl">3</int>
-		<string key="IBCocoaTouchPluginVersion">77</string>
-		<nil key="IBCocoaTouchSimulationTargetRuntimeIdentifier"/>
+		<string key="IBCocoaTouchPluginVersion">300</string>
 	</data>
 </archive>
-->

<script src="https://gist.github.com/861371.js?file=gistfile3.diff"></script>

Looking at the first changeset, I can concisely see what happened. The second, to me, is garbage. Sure, I can look at the commit message, but the diff is pretty much worthless to me. I'll have to fire up Interface Builder and look at the new version without any good comparison to a previous revision. Suddenly, I have a tool at my disposal (version control) that lost a lot of power (and we're not even addressing the difficulties of resolving merge conflicts for XIBs).

So, Interface Builder might have its advantages, but I don't think reining in the amount of code (in a readable and diff-able, i.e., useful, manner) is one of them.
