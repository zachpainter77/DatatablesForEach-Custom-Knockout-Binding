ko.bindingHandlers.DataTablesForEach = {
            
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                 var nodes = Array.prototype.slice.call(element.childNodes, 0);
                ko.utils.arrayForEach(nodes, function (node) {
                    if (node && node.nodeType !== 1) {
                        node.parentNode.removeChild(node);
                    }
                });
                return ko.bindingHandlers.foreach.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

                var value = ko.unwrap(valueAccessor()),
                key = "DataTablesForEach_Initialized";

                var newValue = function () {
                    return {
                        data: value.data || value,
                        beforeRenderAll: function (el, index, data) {

                            if (ko.utils.domData.get(element, key)) {
                                
                                $(element).closest('table').DataTable().destroy();
                            }
                        },
                        afterRenderAll: function (el, index, data) {
                            $(element).closest('table').DataTable(value.options);
                        }

                    };
                };

                ko.bindingHandlers.foreach.update(element, newValue, allBindingsAccessor, viewModel, bindingContext);

                //if we have not previously marked this as initialized and there is currently items in the array, then cache on the element that it has been initialized
                if (!ko.utils.domData.get(element, key) && (value.data || value.length)) {
                    ko.utils.domData.set(element, key, true);
                }

                return { controlsDescendantBindings: true };
            }
        };
