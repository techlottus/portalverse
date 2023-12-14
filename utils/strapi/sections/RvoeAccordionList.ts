export type RvoeAccordionListData = {
 type: 'ComponentSectionsRvoeAccordionList';
 title: string;
 subtitle: string;
 RvoeList: Array<{
  label: string;
  iconName: string;
  program_rvoes: {
    data: {
      attributes: {
       name: string,
       date: string,
       knowledgeArea: string,
       modality: string,
       program: {
        name: string,
        level: string
       }
       campus: string,
       relatedCampuses: string,       
      };
    };
  };
}> 
};

export const RVOE_ACCORDION_CONTENT = `
... on ComponentSectionsRvoeAccordionList {
  title
  subtitle
  RvoeList {
    label
    iconName
    program_rvoes {
      data {
        attributes {
          name
          date
          knowledgeArea {
            data {
              attributes {
                name
                programs {
                  data {
                    attributes {
                      name                              
                    }
                  }
                }
              }
            }
          }
          modality {
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
          campus {
            data {
              attributes {
                name
              }
            }
          }
          relatedCampuses {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
}
`