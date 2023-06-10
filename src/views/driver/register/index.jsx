import { Button, Card, Modal, Tabs } from 'antd';
import React, { Component } from 'react';
import './index.less';
import { checkStepping } from '@/api/register';
import { getTokenRegister, removeTokenRegister } from '@/utils/token';
import { RotateLeftOutlined } from '@ant-design/icons';

import Initial from './components/initial';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import Step4 from './components/step4';
import Step5 from './components/step5';
import Step6 from './components/step6';
import Step7 from './components/step7';
import Step8 from './components/step8';
import Finish from './components/finish';

export class DriverRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      isComplete: false,
      openModal: false,
    };
  }

  componentDidMount() {
    this.checkCurrentStep();
  }

  checkCurrentStep = () => {
    checkStepping().then((results) => {
      console.log(results.data);
      if (results.data.success) {
        let steps = results.data.results;
        if (
          steps.step1 === false &&
          steps.step2 === false &&
          steps.step3 === false &&
          steps.step4 === false &&
          steps.step5 === false &&
          steps.step6 === false &&
          steps.step7 === false &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 2,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === false &&
          steps.step3 === false &&
          steps.step4 === false &&
          steps.step5 === false &&
          steps.step6 === false &&
          steps.step7 === false &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 3,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === true &&
          steps.step3 === false &&
          steps.step4 === false &&
          steps.step5 === false &&
          steps.step6 === false &&
          steps.step7 === false &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 4,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === true &&
          steps.step3 === true &&
          steps.step4 === false &&
          steps.step5 === false &&
          steps.step6 === false &&
          steps.step7 === false &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 5,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === true &&
          steps.step3 === true &&
          steps.step4 === true &&
          steps.step5 === false &&
          steps.step6 === false &&
          steps.step7 === false &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 6,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === true &&
          steps.step3 === true &&
          steps.step4 === true &&
          steps.step5 === true &&
          steps.step6 === false &&
          steps.step7 === false &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 7,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === true &&
          steps.step3 === true &&
          steps.step4 === true &&
          steps.step5 === true &&
          steps.step6 === true &&
          steps.step7 === false &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 8,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === true &&
          steps.step3 === true &&
          steps.step4 === true &&
          steps.step5 === true &&
          steps.step6 === true &&
          steps.step7 === true &&
          steps.step8 === false
        ) {
          this.setState({
            currentStep: 9,
          });
        } else if (
          steps.step1 === true &&
          steps.step2 === true &&
          steps.step3 === true &&
          steps.step4 === true &&
          steps.step5 === true &&
          steps.step6 === true &&
          steps.step7 === true &&
          steps.step8 === true
        ) {
          this.setState({
            currentStep: 10,
          });
        } else {
          this.setState({
            currentStep: 1,
          });
        }
      }
    });
  };

  render() {
    return (
      <div className='container'>
        <Card
          title='Register Driver'
          extra={
            getTokenRegister() ? (
              <Button
                type='primary'
                danger
                icon={<RotateLeftOutlined />}
                onClick={() => this.setState({ openModal: true })}
              >
                {' '}
                Reset
              </Button>
            ) : (
              <></>
            )
          }
        >
          <Tabs
            defaultActiveKey={this.state.currentStep}
            activeKey={this.state.currentStep}
            items={[
              {
                key: 1,
                label: 'Pendaftaran Akun',
                children: <Initial refresh={this.checkCurrentStep} />,
              },
              {
                key: 2,
                label: 'Jenis Kendaraan',
                children: <Step1 refresh={this.checkCurrentStep} />,
              },
              {
                key: 3,
                label: 'Biodata',
                children: (
                  <Step2
                    refresh={this.checkCurrentStep}
                    prevStep={() => {
                      this.setState({
                        currentStep: 2,
                      });
                    }}
                  />
                ),
              },
              {
                key: 4,
                label: 'Foto Driver',
                children: (
                  <Step3
                    refresh={this.checkCurrentStep}
                    prevStep={() => {
                      this.setState({
                        currentStep: 3,
                      });
                    }}
                  />
                ),
              },
              {
                key: 5,
                label: 'ID Driver',
                children: (
                  <Step4
                    refresh={this.checkCurrentStep}
                    prevStep={() => {
                      this.setState({
                        currentStep: 4,
                      });
                    }}
                  />
                ),
              },
              {
                key: 6,
                label: 'SIM',
                children: (
                  <Step5
                    refresh={this.checkCurrentStep}
                    prevStep={() => {
                      this.setState({
                        currentStep: 5,
                      });
                    }}
                  />
                ),
              },
              {
                key: 7,
                label: 'Kendaraan',
                children: (
                  <Step6
                    refresh={this.checkCurrentStep}
                    prevStep={() => {
                      this.setState({
                        currentStep: 6,
                      });
                    }}
                  />
                ),
              },
              {
                key: 8,
                label: 'SKCK',
                children: (
                  <Step7
                    refresh={this.checkCurrentStep}
                    prevStep={() => {
                      this.setState({
                        currentStep: 7,
                      });
                    }}
                  />
                ),
              },
              {
                key: 9,
                label: 'Bank',
                children: (
                  <Step8
                    refresh={this.checkCurrentStep}
                    prevStep={() => {
                      this.setState({
                        currentStep: 8,
                      });
                    }}
                  />
                ),
              },
              {
                key: 10,
                label: 'Selesai',
                children: (
                  <Finish
                    refresh={this.checkCurrentStep}
                    finishStep={() => {
                      if (getTokenRegister()) {
                        removeTokenRegister();
                        window.location.reload();
                      }
                    }}
                  />
                ),
              },
            ]}
          />
        </Card>
        <Modal
          open={this.state.openModal}
          onCancel={() => this.setState({ openModal: false })}
          onOk={() => {
            removeTokenRegister();
            this.setState({ openModal: false });
            window.location.reload();
          }}
          title='Reset Form'
          okText='Reset'
          destroyOnClose={true}
        >
          <strong>
            Mereset Pendaftaran akan menyebabkan data driver menjadi cacat.
            Mohon melakukan peresetan pendaftaran dengan hati-hati.
          </strong>
        </Modal>
      </div>
    );
  }
}

export default DriverRegister;
