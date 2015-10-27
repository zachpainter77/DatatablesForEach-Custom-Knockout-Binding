ko.bindingHandlers.DataTablesForEach = {
            page: 0,
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                        valueAccessor().data.subscribe(function (changes) {
                                    var table = $(element).closest('table').DataTable();
                                    ko.bindingHandlers.DataTablesForEach.page = table.page();
                                    table.destroy();
                        }, null, 'arrayChange');            
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
                        key = 'DataTablesForEach_Initialized';
                        var newValue = function () {
                                    return {
                                                data: value.data || value,
                                                afterRenderAll: function () {
                                                            var table = $(element).closest('table').DataTable(value.options);
                                                            if (value.options.paging) {
                                                                        if (table.page.info().pages - ko.bindingHandlers.DataTablesForEach.page == 0) {
                                                                                    table.page(--ko.bindingHandlers.DataTablesForEach.page).draw(false);
                                                                        }
                                                            else {
                                                                        table.page(ko.bindingHandlers.DataTablesForEach.page).draw(false);
                                                            }
                                                }
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
