export type RvoeAccordionListData = {
  type: 'ComponentSectionsRvoeAccordionList';
  title: string;
  subtitle: string;
  rvoeList: Array<{
    label: string;
    iconName: string;
    modalityCategory: {
      data: {
        attributes: {
          name: string,
          label: string,
          modalities: {
            data: Array<{
              attributes: {
                name: string,
                label: string,
                programRvoes: {
                  data: {
                    attributes: {
                      name: string
                      date: string
                      modality: {
                        data: {
                          attributes: {
                            name: string,
                          }
                        }
                      }
                      knowledgeArea: {
                        data: {
                          attributes: {
                            name: string
                          }
                        }
                      }
                      program: {
                        data: {
                          attributes: {
                            name: string,
                          }
                        }
                      }
                    }
                  }
                }
              }
            }>
          }
        };
      };
    };
  }>
};

export const RVOE_ACCORDION_CONTENT = `
... on ComponentSectionsRvoeAccordionList {
  title
  subtitle
  rvoeList {
    label
    iconName
    modalityCategory {
      data {
        attributes {
          name
          label
          modalities {
            data {
              attributes {
                name
                label                                                  
                programRvoes {
                  data {
                    attributes {
                      name
                      date
                      modality {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                      knowledgeArea {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                      program {
                        data {
                          attributes {
                            name 
                            level {
                              data {
                                attributes {
                                  title
                                }
                              }
                            } 
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`