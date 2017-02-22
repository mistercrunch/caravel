import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Label, Panel } from 'react-bootstrap';
import ExploreActionButtons from './ExploreActionButtons';
import FaveStar from '../../components/FaveStar';
import TooltipWrapper from '../../components/TooltipWrapper';
import Timer from '../../components/Timer';
import { getFormDataFromControls } from '../stores/store';
import Chart from './Chart';

const CHART_STATUS_MAP = {
  failed: 'danger',
  loading: 'warning',
  success: 'success',
};

const propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.string,
  can_download: PropTypes.bool.isRequired,
  chartStatus: PropTypes.string,
  chartUpdateEndTime: PropTypes.number,
  chartUpdateStartTime: PropTypes.number.isRequired,
  datasource: PropTypes.object,
  height: PropTypes.string.isRequired,
  isStarred: PropTypes.bool.isRequired,
  slice: PropTypes.object,
  table_name: PropTypes.string,
  formData: PropTypes.object,
  latestQueryFormData: PropTypes.object,
};

class ChartContainer extends React.PureComponent {
<<<<<<< 8042ac876e80c08d72489287777cb1e9672b177a
  constructor(props) {
    super(props);
    this.state = {
      selector: `#${props.containerId}`,
      showStackTrace: false,
    };
  }

  renderViz() {
    this.props.actions.renderTriggered();
    const mockSlice = this.getMockedSliceObject();
    this.setState({ mockSlice });
    try {
      visMap[this.props.viz_type](mockSlice, this.props.queryResponse);
    } catch (e) {
      this.props.actions.chartRenderingFailed(e);
    }
  }

  componentDidUpdate(prevProps) {
    if (
        (
          prevProps.queryResponse !== this.props.queryResponse ||
          prevProps.height !== this.props.height ||
          this.props.triggerRender
        ) && !this.props.queryResponse.error
        && this.props.chartStatus !== 'failed'
        && this.props.chartStatus !== 'stopped'
      ) {
      this.renderViz();
    }
  }

  getMockedSliceObject() {
    const props = this.props;
    const getHeight = () => {
      const headerHeight = this.props.standalone ? 0 : 100;
      return parseInt(props.height, 10) - headerHeight;
    };
    return {
      viewSqlQuery: this.props.queryResponse.query,
      containerId: props.containerId,
      selector: this.state.selector,
      formData: this.props.formData,
      container: {
        html: (data) => {
          // this should be a callback to clear the contents of the slice container
          $(this.state.selector).html(data);
        },
        css: (dim, size) => {
          // dimension can be 'height'
          // pixel string can be '300px'
          // should call callback to adjust height of chart
          $(this.state.selector).css(dim, size);
        },
        height: getHeight,
        show: () => { },
        get: (n) => ($(this.state.selector).get(n)),
        find: (classname) => ($(this.state.selector).find(classname)),
      },

      width: () => this.chartContainerRef.getBoundingClientRect().width,

      height: getHeight,

      setFilter: () => {},

      getFilters: () => (
        // return filter objects from viz.formData
        {}
      ),

      addFilter: () => {},

      removeFilter: () => {},

      done: () => {},
      clearError: () => {
        // no need to do anything here since Alert is closable
        // query button will also remove Alert
      },
      error() {},

      d3format: (col, number) => {
        // mock d3format function in Slice object in superset.js
        const format = props.column_formats[col];
        return d3format(format, number);
      },

      data: {
        csv_endpoint: getExploreUrl(this.props.formData, 'csv'),
        json_endpoint: getExploreUrl(this.props.formData, 'json'),
        standalone_endpoint: getExploreUrl(
          this.props.formData, 'standalone'),
      },

    };
  }

  removeAlert() {
    this.props.actions.removeChartAlert();
  }
=======
>>>>>>> Refactoring Chart in more components to allow for Dashboard embedding

  renderChartTitle() {
    let title;
    if (this.props.slice) {
      title = this.props.slice.slice_name;
    } else {
      title = `[${this.props.table_name}] - untitled`;
    }
    return title;
  }

  runQuery() {
    this.props.actions.runQuery(this.props.formData, true);
  }

  render() {
    if (this.props.standalone) {
      return this.renderChart();
    }
    const queryResponse = this.props.queryResponse;
    const query = queryResponse && queryResponse.query ? queryResponse.query : null;
    return (
      <div className="chart-container">
        <Panel
          style={{ height: this.props.height }}
          header={
            <div
              id="slice-header"
              className="clearfix panel-title-large"
            >
              {this.renderChartTitle()}

              {this.props.slice &&
                <span>
                  <FaveStar
                    sliceId={this.props.slice.slice_id}
                    actions={this.props.actions}
                    isStarred={this.props.isStarred}
                  />

                  <TooltipWrapper
                    label="edit-desc"
                    tooltip="Edit Description"
                  >
                    <a
                      className="edit-desc-icon"
                      href={`/slicemodelview/edit/${this.props.slice.slice_id}`}
                    >
                      <i className="fa fa-edit" />
                    </a>
                  </TooltipWrapper>
                </span>
              }

              <div className="pull-right">
                {this.props.chartStatus === 'success' &&
                 this.props.queryResponse &&
                 this.props.queryResponse.is_cached &&
                  <TooltipWrapper
                    tooltip="Loaded from cache. Click to force refresh"
                    label="cache-desc"
                  >
                    <Label
                      style={{ fontSize: '10px', marginRight: '5px', cursor: 'pointer' }}
                      onClick={this.runQuery.bind(this)}
                    >
                      cached
                    </Label>
                  </TooltipWrapper>
                }
                <Timer
                  startTime={this.props.chartUpdateStartTime}
                  endTime={this.props.chartUpdateEndTime}
                  isRunning={this.props.chartStatus === 'loading'}
                  status={CHART_STATUS_MAP[this.props.chartStatus]}
                  style={{ fontSize: '10px', marginRight: '5px' }}
                />
                <ExploreActionButtons
                  formData={this.props.latestQueryFormData}
                  canDownload={this.props.can_download}
                />
              </div>
            </div>
          }
        >
        {this.props.datasource &&
          <Chart
            actions={this.props.actions}
            alert={this.props.alert}
            chartStatus={this.props.chartStatus}
            datasource={this.props.datasource}
            height={this.props.height}
            formData={this.props.formData}
            queryResponse={this.props.queryResponse}
            triggerRender={this.props.triggerRender}
          />
        }
        </Panel>
      </div>
    );
  }
}

ChartContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const formData = getFormDataFromControls(state.controls);
  return {
    alert: state.chartAlert,
    can_download: state.can_download,
    chartStatus: state.chartStatus,
    chartUpdateEndTime: state.chartUpdateEndTime,
    chartUpdateStartTime: state.chartUpdateStartTime,
    datasource: state.datasource,
    formData,
    latestQueryFormData: state.latestQueryFormData,
    isStarred: state.isStarred,
    queryResponse: state.queryResponse,
    slice: state.slice,
    standalone: state.standalone,
    table_name: formData.datasource_name,
    triggerRender: state.triggerRender,
    datasourceType: state.datasource ? state.datasource.type : null,
  };
}

export default connect(mapStateToProps, () => ({}))(ChartContainer);
