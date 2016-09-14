/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */
'use strict';

module.exports = function(_ref) {
  var t = _ref.types;

  // Plugins visitor
  const pluginsVisitor = {
    FunctionExpression: function FunctionExpression(path, state) {
      if (path.node.id !== null && path.node.id.name === 'plugins') {
        // Modify plugins function
        var body = path.node.body.body;
        for (var i = 0; i < body.length; i++) {
          if (body[i].type === 'VariableDeclaration') {
            var declaration = body[i].declarations[0];
            if (declaration.type === 'VariableDeclarator'
               && declaration.id.type === 'Identifier'
               && declaration.id.name === 'load_plugins'
               && declaration.init.type === 'ArrayExpression'
            ) {
              // Load plugins
              var params = [i + 1, 0];
              declaration.init.elements.forEach(function(mod) {
                params.push(t.expressionStatement(t.callExpression(
                  t.identifier('loadModule'),
                  [t.callExpression(
                    t.identifier('require'),
                    [t.stringLiteral('apentle-plugin-' + mod.value)]
                  )]
                )));
              });
              Array.prototype.splice.apply(body, params);
              break;
            }
          }
        }
      }
    }
  };

  // Themes visitor
  const themesVisitor = {
    FunctionExpression: function FunctionExpression(path, state) {
      if (path.node.id !== null && path.node.id.name === 'themes') {
        // Modify themes function
        var body = path.node.body.body;
        for (var i = 0; i < body.length; i++) {
          if (body[i].type === 'VariableDeclaration') {
            var declaration = body[i].declarations[0];
            if (declaration.type === 'VariableDeclarator'
               && declaration.id.type === 'Identifier'
               && declaration.id.name === 'load_themes'
               && declaration.init.type === 'ArrayExpression'
            ) {
              // Load themes
              var params = [i + 1, 0];
              declaration.init.elements.forEach(function(mod) {
                params.push(t.expressionStatement(t.callExpression(
                  t.identifier('loadModule'),
                  [
                    t.callExpression(
                      t.identifier('require'),
                      [t.stringLiteral('apentle-theme-' + mod.value)]
                    ),
                    t.stringLiteral(params.length === 2 ? 'default' : mod.value)
                  ]
                )));
              });
              Array.prototype.splice.apply(body, params);
              break;
            }
          }
        }
      }
    }
  };

  return {
    visitor: {
      Program: function Program(path, state) {
        // Check is bootstrap modules files
        var filename = state.file.opts.filename;
        if (filename.indexOf('app/bootstrap/plugins.js') !== -1) {
          // Plugins transform
          path.traverse(pluginsVisitor);
        } else if (filename.indexOf('app/bootstrap/themes.js') !== -1) {
          // Themes transform
          path.traverse(themesVisitor);
        }
      }
    }
  };
};
