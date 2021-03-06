/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Dictionary blocks for Blockly.
 * @author acbart@vt.edu (Austin Cory Bart)
 */
'use strict';

goog.provide('Blockly.Blocks.dicts');

goog.require('Blockly.Blocks');


Blockly.Blocks.dicts.HUE = 0;



Blockly.Blocks['dicts_create_with'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
	  this.appendDummyInput("")
        .appendField('')
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH)
        
    this.itemCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['dicts_create_with_item']));
    this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_TOOLTIP);
  },
  /**
   * Create XML to represent list inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock =
        Blockly.Block.obtain(workspace, 'dicts_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'dicts_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    var i = 0;
    while (itemBlock) {
      connections[i] = itemBlock.valueConnection_;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
      i++;
    }
    this.itemCount_ = i;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else {
      var i = 0;
      while (this.getInput('ADD' + i)) {
        this.removeInput('ADD' + i);
        i++;
      }
    }
    // Rebuild block.
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.DICTS_CREATE_EMPTY_TITLE);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i) .appendField(new Blockly.FieldTextInput('key'), 'KEY' + i).appendField(':');
        input.setAlign(Blockly.ALIGN_RIGHT);
        
      }
    }
  },getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks['dicts_create_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DICTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};


Blockly.Blocks['dicts_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};



Blockly.Blocks['dicts_keys'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
  this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(Blockly.Msg.DICT_KEYS);  
  this.setTooltip(Blockly.Msg.DICTS_KEYS_TOOLTIP);      
  this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_get'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DICTS_GET_FROM_DICTS)
        .appendField(new Blockly.FieldTextInput('mydict'), 'DICT')
        .appendField(Blockly.Msg.DICTS_GET_IN)
        .appendField(new Blockly.FieldTextInput('key'), 'KEY')
        .appendField(Blockly.Msg.DICTS_GET_VALUE);
       
    this.setOutput(true);
  this.setTooltip(Blockly.Msg.DICTS_GET_TOOLTIP);
  }
};

Blockly.Blocks['dicts_add_or_change'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('data')
        .appendField(Blockly.Msg.DICTS_GET_FROM_DICTS)
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(Blockly.Msg.DICTS_ADD)
        .appendField(new Blockly.FieldTextInput('key'), 'KEY')
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);
    this.appendDummyInput();
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.DICTS_ADD_OR_CHANGE_TOOLTIP);
  }
};

Blockly.Blocks['dicts_delete'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DICTS_GET_FROM_DICTS)
        .appendField(new Blockly.FieldTextInput('mydict'), 'DICT')
        .appendField(Blockly.Msg.DICTS_DELETE_IN)
        .appendField(new Blockly.FieldTextInput('key'), 'KEY')
        .appendField(Blockly.Msg.DICTS_DELETE_VALUE);
       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.Msg.DICTS_DELETE_TOOLTIP);
  }
};

Blockly.Blocks['dicts_clear'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(Blockly.Msg.DICT_CLEAR);  
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['dicts_items'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
  this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(Blockly.Msg.DICT_ITEMS);  
  this.setTooltip(Blockly.Msg.DICTS_ITEMS_TOOLTIP);      
  this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_values'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
  this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(Blockly.Msg.DICT_VALUES);  
  this.setTooltip(Blockly.Msg.DICTS_VALUES_TOOLTIP);      
  this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_length'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
  this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_LENGTH_TITLE)
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR');
  this.setTooltip(Blockly.Msg.LISTS_LENGTH_TOOLTIP);
  this.setOutput(true, Number);
  }
};

Blockly.Blocks['dicts_deldict'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(Blockly.Msg.DICT_DELDICT);  
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};