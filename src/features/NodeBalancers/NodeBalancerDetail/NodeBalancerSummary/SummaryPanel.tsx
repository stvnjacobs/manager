import * as React from 'react';
import { compose } from 'recompose';
import Paper from 'src/components/core/Paper';
import {
  StyleRulesCallback,
  withStyles,
  WithStyles
} from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import TagsPanel from 'src/components/TagsPanel';
import styled, { StyleProps } from 'src/containers/SummaryPanels.styles';
import IPAddress from 'src/features/linodes/LinodesLanding/IPAddress';
import { formatRegion } from 'src/utilities';
import { convertMegabytesTo } from 'src/utilities/convertMegabytesTo';
import { NodeBalancerConsumer } from '../context';

type ClassNames =
  | 'NBsummarySection'
  | 'IPgrouping'
  | 'nodeTransfer'
  | 'hostName';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  NBsummarySection: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 6
    }
  },
  IPgrouping: {
    margin: '-2px 0 0 2px',
    display: 'flex',
    flexDirection: 'column'
  },
  nodeTransfer: {
    marginTop: 12
  },
  hostName: {
    wordBreak: 'break-word'
  }
});

interface Props {
  nodeBalancer: Linode.ExtendedNodeBalancer;
}

type CombinedProps = Props & StyleProps & WithStyles<ClassNames>;

const SummaryPanel: React.StatelessComponent<CombinedProps> = props => {
  const { nodeBalancer, classes } = props;

  return (
    <NodeBalancerConsumer>
      {({ updateTags }) => {
        return (
          <div className={classes.root}>
            <Paper
              className={`${classes.summarySection} ${
                classes.NBsummarySection
              }`}
            >
              <Typography
                role="header"
                variant="h3"
                className={classes.title}
                data-qa-title
              >
                NodeBalancer Details
              </Typography>
              <div className={classes.section}>
                <Typography variant="body1" data-qa-ports>
                  <strong>Ports: </strong>
                  {nodeBalancer.ports.length === 0 && 'None'}
                  {nodeBalancer.ports.join(', ')}
                </Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1" data-qa-node-status>
                  <strong>Node Status: </strong>
                  {`${nodeBalancer.up} up, ${nodeBalancer.down} down`}
                </Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1" data-qa-transferred>
                  <strong>Transferred: </strong>
                  {convertMegabytesTo(nodeBalancer.transfer.total)}
                </Typography>
              </div>
              <div className={classes.section}>
                <Typography
                  variant="body1"
                  className={classes.hostName}
                  data-qa-hostname
                >
                  <strong>Host Name: </strong>
                  {nodeBalancer.hostname}
                </Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1" data-qa-region>
                  <strong>Region:</strong> {formatRegion(nodeBalancer.region)}
                </Typography>
              </div>
            </Paper>

            <Paper className={classes.summarySection}>
              <Typography
                role="header"
                variant="h3"
                className={classes.title}
                data-qa-title
              >
                IP Addresses
              </Typography>
              <div className={`${classes.section}`}>
                <div className={classes.IPgrouping} data-qa-ip>
                  <IPAddress ips={[nodeBalancer.ipv4]} copyRight showMore />
                  {nodeBalancer.ipv6 && (
                    <IPAddress ips={[nodeBalancer.ipv6]} copyRight />
                  )}
                </div>
              </div>
            </Paper>

            <Paper className={classes.summarySection}>
              <Typography
                role="header"
                variant="h3"
                className={classes.title}
                data-qa-title
              >
                Tags
              </Typography>
              <TagsPanel tags={nodeBalancer.tags} updateTags={updateTags} />
            </Paper>
          </div>
        );
      }}
    </NodeBalancerConsumer>
  );
};

const localStyles = withStyles(styles);

const enhanced = compose<CombinedProps, Props>(
  styled,
  localStyles
);

export default enhanced(SummaryPanel);
