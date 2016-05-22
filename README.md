# node-red-contrib-bigline

"Line" parser for Big Nodes. Following the "big csv" and "big file" implementations, here is a node working the same way

![alt tag](https://cloud.githubusercontent.com/assets/18165555/15456145/f8e60f10-2067-11e6-8252-c013bbe1eb12.png)

![alt tag](https://cloud.githubusercontent.com/assets/18165555/15456148/01e3aee2-2068-11e6-88f1-27409e7d2e69.png)

## Installation
```bash
npm install node-red-contrib-bigline
```

## Principles for Big Nodes

See [biglib](https://www.npmjs.com/package/node-red-biglib) for details on Big Nodes.
`Big Lib` and subsequent `Big Nodes` are a family of nodes built for my own purpose. They are all designed to help me build a complete process for **production purposes**. For that I needed nodes able to:

* Flow **big volume** of data (memory control, work with buffers)
* Work with *a flow of blocks* (buffers) (multiple payload within a single job)
* Tell what *they are doing* with extended use of statuses (color/message)
* Use their *second output for flow control* (start/stop/running/status)
* *Reuse messages* in order to propagate _msgid, topic
* Depends on **state of the art** libraries for parsing (csv, xml, xlsxs, line, ...)
* Acts as **filters by default** (1 payload = 1 action) or **data generators** (block flow)

All functionnalities are built under a library named `biglib` and all `Big Nodes` rely on it

## Usages

Big Line is a filter node for node-red to transform data into lines, one message per line. It uses the "byline" library

It works as a filter node that means it takes in the output of a "big file" node or any block node. It's able to read a file by itself to send lines

It has two options as byline offers them:

* **data format** (utf8, latin, hexdec, base64, ucs2 and ascii). This option is only used when reading a file
* **keep empty lines**

It has a **filename** property used to read files in the specific given *data format**

## Dependencies

[byline](https://www.npmjs.com/package/byline) simple line-by-line stream reader

[biglib](https://www.npmjs.com/package/node-red-biglib) library for building node-red flows that supports blocks, high volume

## Example flow files

  Try pasting in the flow file below that shows the node behaviour 

```json
[{"id":"7f677e4c.80988","type":"inject","z":"d7f0f148.280f1","name":"GO","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":430,"y":120,"wires":[["23aa1547.dc55ea"]]},{"id":"23aa1547.dc55ea","type":"function","z":"d7f0f148.280f1","name":"sample data","func":"msg.control = { state: \"standalone\" }\nmsg.payload = \"This is a line\\nThis is a second line\\n\\nThis is a ending line\"\nreturn msg;","outputs":1,"noerr":0,"x":610,"y":200,"wires":[["f219f15e.0de61"]]},{"id":"f219f15e.0de61","type":"bigline","z":"d7f0f148.280f1","name":"big line","filename":"","format":"utf8","keepEmptyLines":true,"x":800,"y":280,"wires":[["e68deb8e.197218"],["e1300565.1ecff8"]]},{"id":"e68deb8e.197218","type":"debug","z":"d7f0f148.280f1","name":"lines","active":true,"console":"false","complete":"payload","x":970,"y":200,"wires":[]},{"id":"e1300565.1ecff8","type":"debug","z":"d7f0f148.280f1","name":"status","active":true,"console":"false","complete":"control","x":970,"y":340,"wires":[]},{"id":"220d8b4e.ddf274","type":"inject","z":"d7f0f148.280f1","name":"GO keep empty lines","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":140,"y":220,"wires":[["d72e181d.28d1e8"]]},{"id":"6d8a0609.9275f8","type":"inject","z":"d7f0f148.280f1","name":"GO ignore empty lines","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":140,"y":300,"wires":[["d6aad846.295528"]]},{"id":"d6aad846.295528","type":"function","z":"d7f0f148.280f1","name":"keepEmptyLines=false","func":"msg.config = { keepEmptyLines: false }\nreturn msg;","outputs":1,"noerr":0,"x":380,"y":280,"wires":[["23aa1547.dc55ea"]]},{"id":"d72e181d.28d1e8","type":"function","z":"d7f0f148.280f1","name":"keepEmptyLines=true","func":"msg.config = { keepEmptyLines: true }\nreturn msg;","outputs":1,"noerr":0,"x":380,"y":200,"wires":[["23aa1547.dc55ea"]]},{"id":"44d2ade5.bb2d54","type":"comment","z":"d7f0f148.280f1","name":"This node accepts on the fly configuration","info":"","x":189,"y":150,"wires":[]},{"id":"396f3087.c690d","type":"comment","z":"d7f0f148.280f1","name":"4 lines of data with 1 empty line","info":"","x":690,"y":160,"wires":[]},{"id":"1aa13977.e55ec7","type":"comment","z":"d7f0f148.280f1","name":"control messages (start, stop, ...)","info":"","x":1050,"y":380,"wires":[]},{"id":"86fb9d2f.79046","type":"comment","z":"d7f0f148.280f1","name":"One message per line","info":"","x":1020,"y":240,"wires":[]},{"id":"a92d08b1.56d2f8","type":"comment","z":"d7f0f148.280f1","name":"Simple trigger","info":"","x":450,"y":80,"wires":[]},{"id":"24787944.db8786","type":"inject","z":"d7f0f148.280f1","name":"GO with an error","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":120,"y":360,"wires":[["aa1b01cb.55e5"]]},{"id":"aa1b01cb.55e5","type":"function","z":"d7f0f148.280f1","name":"Non existing file","func":"msg.filename = \"/A/Probably/Non/Existing/File\"\nreturn msg;","outputs":1,"noerr":0,"x":600,"y":360,"wires":[["f219f15e.0de61"]]},{"id":"83a230ab.7c5dd","type":"comment","z":"d7f0f148.280f1","name":"Big Line sample usage","info":"","x":120,"y":40,"wires":[]}]
```

![alt tag](https://cloud.githubusercontent.com/assets/18165555/15456149/0aca293c-2068-11e6-94d0-608d76a1186b.png)

## Author

  - Jacques W

## License

This code is Open Source under an Apache 2 License.

You may not use this code except in compliance with the License. You may obtain an original copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Please see the
License for the specific language governing permissions and limitations under the License.

## Feedback and Support

Please report any issues or suggestions via the [Github Issues list for this repository](https://github.com/Jacques44/node-red-contrib-bigline/issues).

For more information, feedback, or community support see the Node-Red Google groups forum at https://groups.google.com/forum/#!forum/node-red


