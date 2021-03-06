import createConnector from '../core/createConnector';
import { getResults } from '../core/indexUtils';

/**
 * The `connectStateResults` connector provides a way to access the `searchState` and the `searchResults`
 * of InstantSearch.
 * For instance this connector allows you to create results/noResults or query/noQuery pages.
 * @name connectStateResults
 * @kind connector
 * @providedPropType {object} searchState - The search state of the instant search component. <br/><br/> See: [Search state structure](https://community.algolia.com/react-instantsearch/guide/Search_state.html)
 * @providedPropType {object} searchResults - The search results. <br/><br/> In case of multiple indices: if used under `<Index>`, results will be those of the corresponding index otherwise it'll be those of the root index  See: [Search results structure](https://community.algolia.com/algoliasearch-helper-js/reference.html#searchresults)
 * @providedPropType {object} allSearchResults - In case of multiple indices you can retrieve all the results
 * @providedPropType {string} error - If the search failed, the error will be logged here.
 * @providedPropType {boolean} searching - If there is a search in progress.
 * @providedPropType {boolean} searchingForFacetValues - If there is a search in a list in progress.
 * @providedPropType {object} props - component props.
 * @example
 * import React from 'react';
 *
 * import { InstantSearch, Hits } from 'react-instantsearch/dom';
 * import { connectStateResults } from 'react-instantsearch/connectors';
 *
 * const Content = connectStateResults(
 *      ({ searchState, searchResults }) =>
 *        searchResults && searchResults.nbHits !== 0
 *          ? <Hits/>
 *          : <div>
 *              No results has been found for {searchState.query}
 *            </div>
 * );
 *
 * export default function App() {
 *  return (
 *    <InstantSearch
 *       appId="latency"
 *       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
 *       indexName="ikea"
 *     >
 *       <Content />
 *     </InstantSearch>
 *  );
 * }
 */
export default createConnector({
  displayName: 'AlgoliaStateResults',

  getProvidedProps(props, searchState, searchResults) {
    const results = getResults(searchResults, this.context);
    return {
      searchState,
      searchResults: results,
      allSearchResults: searchResults.results,
      searching: searchResults.searching,
      error: searchResults.error,
      searchingForFacetValues: searchResults.searchingForFacetValues,
      props,
    };
  },
});
