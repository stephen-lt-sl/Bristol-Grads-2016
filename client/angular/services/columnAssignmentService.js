(function() {
    angular
        .module("TwitterWallApp")
        .factory("columnAssignmentService", columnAssignmentService);

    columnAssignmentService.$inject = [];

    function columnAssignmentService() {
        return {
            ColumnData: ColumnData,
            assignColumns: assignColumns,
            sortColumns: sortColumns,
            backfillColumns: backfillColumns,
        };

        // Metadata for an individual tweet column
        function ColumnData(slots, selector, ordering) {
            this.slots = slots;
            this.selector = selector;
            this.ordering = ordering;
        }

        function assignColumns(tweets, columnDataList) {
            // Set columnList to an array of length equal to columnDataList, consisting of empty arrays
            var columnList = columnDataList.map(function() {
                return [];
            });
            tweets.forEach(function(tweet) {
                // Find the index of the first column that matches the tweet
                var columnIndex = columnDataList.findIndex(function(columnData) {
                    return columnData.selector(tweet);
                });
                columnList[columnIndex].push(tweet);
            });
            return columnList;
        }

        function sortColumns(columnList, columnDataList) {
            return columnList.map(function(column, idx) {
                return sortColumn(column, columnDataList[idx]);
            });
        }

        function sortColumn(column, columnData) {
            return column.slice().sort(columnData.ordering);
        }

        function backfillColumns(columnList, columnDataList) {
            return columnList.map(function(column, idx) {
                return column.slice(0, columnDataList[idx].slots);
            });
        }
    }

})();
