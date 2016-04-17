/*
  Copyright (c) 2016 Jacques W.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  This a Big Node!

  /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
 
   Big Nodes principles:
 
   #1 can handle big data
   #2 send start/end messages
   #3 visually tell what they are doing

   Any issues? https://github.com/Jacques44
 
  /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

*/

module.exports = function(RED) {

  var biglib = require('node-red-biglib');

  function BigLine(config) {

    RED.nodes.createNode(this, config);    

    // new instance of biglib for this node
    // don't need to require the line parser library as biglib already has it (parser option)
    // status sets to records as this node is sending lines
    var bignode = new biglib({ config: config, parser: 'line', node: this, status: 'records' });

    // biglib changes the configuration to add some properties
    config = bignode.config();

    this.on('input', bignode.main.bind(bignode));

  }

  RED.nodes.registerType("bigline", BigLine);
}


