import React, { useEffect, useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { observer } from 'mobx-react-lite'

import activeNodeArrayFromPathname from '../../utils/activeNodeArrayFromPathname'

const Container = styled.div`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
`
const StyledReflexContainer = styled(ReflexContainer)`
  height: calc(100vh - 64px) !important;
`

import ErrorBoundary from '../../components/ErrorBoundary'
import Layout from '../../components/Layout'
import Tree from '../../components/Tree'
import storeContext from '../../storeContext'

const Vermehrung = ({ data, location }) => {
  const store = useContext(storeContext)
  const { setActiveNodeArray } = store.tree

  // fetch path
  const { pathname } = location
  const path = activeNodeArrayFromPathname(pathname)
  // on path change update activeNodeArray
  useEffect(() => {
    setActiveNodeArray(path)
  }, [path])

  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <StyledReflexContainer orientation="vertical">
            <ReflexElement
              flex={0.3}
              propagateDimensions={true}
              renderOnResizeRate={200}
              renderOnResize={true}
            >
              <Tree data={data} />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement
              propagateDimensions={true}
              renderOnResizeRate={200}
              renderOnResize={true}
            >
              <p>Form</p>
            </ReflexElement>
          </StyledReflexContainer>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export default observer(Vermehrung)

// TODO
// pass parameters according to activeNodeArray
// to filter only needed parts of the data
export const query = graphql`
  query TreeQuery {
    hasura {
      garten {
        id
        personBypersonId {
          id
          name
        }
        kultursBygartenId {
          id
          gartenBygartenId {
            id
            personBypersonId {
              id
              name
            }
          }
          kulturEventsBykulturId {
            id
            datum
            event
          }
          kulturInventarsBykulturId {
            id
            datum
            kasten
            beet
            nr
          }
          zaehlungsBykulturId {
            id
            datum
          }
          sammlungInKultursBykulturId {
            id
            sammlungBysammlungId {
              id
              herkunftByherkunftId {
                id
                nr
              }
              lieferungsByvonSammlungId {
                id
                personBypersonId {
                  id
                  name
                }
                lieferungTypWerteBytyp {
                  id
                  wert
                }
                lieferungStatusWerteBystatus {
                  id
                  wert
                }
                von_datum
                kulturBynachKulturId {
                  id
                  gartenBygartenId {
                    id
                    personBypersonId {
                      id
                      name
                    }
                  }
                  kulturEventsBykulturId {
                    id
                    datum
                    event
                  }
                  kulturInventarsBykulturId {
                    id
                    datum
                    kasten
                    beet
                    nr
                  }
                  zaehlungsBykulturId {
                    id
                    datum
                  }
                }
                nach_ausgepflanzt
              }
            }
          }
        }
      }
      ae_art(where: { ae_art_art: { id: { _is_null: false } } }) {
        id
        name
        ae_art_art {
          id
          ae_id
          kultursByartId {
            id
            gartenBygartenId {
              id
              personBypersonId {
                id
                name
              }
            }
            kulturEventsBykulturId {
              id
              datum
              event
            }
            kulturInventarsBykulturId {
              id
              datum
              kasten
              beet
              nr
            }
            zaehlungsBykulturId {
              id
              datum
            }
            lieferungsByvonKulturId {
              id
              personBypersonId {
                id
                name
              }
              lieferungTypWerteBytyp {
                id
                wert
              }
              lieferungStatusWerteBystatus {
                id
                wert
              }
              von_datum
            }
            lieferungsBynachKulturId {
              id
              personBypersonId {
                id
                name
              }
              lieferungTypWerteBytyp {
                id
                wert
              }
              lieferungStatusWerteBystatus {
                id
                wert
              }
              nach_datum
            }
            sammlungInKultursBykulturId {
              id
              sammlungBysammlungId {
                id
                herkunftByherkunftId {
                  id
                  nr
                }
                lieferungsByvonSammlungId {
                  id
                  personBypersonId {
                    id
                    name
                  }
                  lieferungTypWerteBytyp {
                    id
                    wert
                  }
                  lieferungStatusWerteBystatus {
                    id
                    wert
                  }
                  von_datum
                  kulturBynachKulturId {
                    id
                    gartenBygartenId {
                      id
                      personBypersonId {
                        id
                        name
                      }
                    }
                    kulturEventsBykulturId {
                      id
                      datum
                      event
                    }
                    kulturInventarsBykulturId {
                      id
                      datum
                      kasten
                      beet
                      nr
                    }
                    zaehlungsBykulturId {
                      id
                      datum
                    }
                  }
                  nach_ausgepflanzt
                }
              }
            }
          }
          sammlungsByartId {
            id
            art_id
            herkunftByherkunftId {
              id
              nr
            }
            artByartId {
              id
              art_ae_art {
                id
                name
              }
            }
            datum
            sammlungInKultursBysammlungId {
              id
              kulturBykulturId {
                id
                gartenBygartenId {
                  id
                  personBypersonId {
                    id
                    name
                  }
                }
              }
            }
            lieferungsByvonSammlungId {
              id
              personBypersonId {
                id
                name
              }
              lieferungTypWerteBytyp {
                id
                wert
              }
              lieferungStatusWerteBystatus {
                id
                wert
              }
              von_datum
              kulturBynachKulturId {
                id
                gartenBygartenId {
                  id
                  personBypersonId {
                    id
                    name
                  }
                }
                kulturEventsBykulturId {
                  id
                  datum
                  event
                }
                kulturInventarsBykulturId {
                  id
                  datum
                  kasten
                  beet
                  nr
                }
                zaehlungsBykulturId {
                  id
                  datum
                }
              }
              nach_ausgepflanzt
            }
          }
        }
      }
      herkunft {
        id
        lokalname
        sammlungsByherkunftId {
          id
          art_id
          artByartId {
            id
            art_ae_art {
              id
              name
            }
          }
          datum
          sammlungInKultursBysammlungId {
            id
            kulturBykulturId {
              id
              gartenBygartenId {
                id
                personBypersonId {
                  id
                  name
                }
              }
            }
          }
          lieferungsByvonSammlungId {
            id
            personBypersonId {
              id
              name
            }
            lieferungTypWerteBytyp {
              id
              wert
            }
            lieferungStatusWerteBystatus {
              id
              wert
            }
            von_datum
            kulturBynachKulturId {
              id
              gartenBygartenId {
                id
                personBypersonId {
                  id
                  name
                }
              }
              kulturEventsBykulturId {
                id
                datum
                event
              }
              kulturInventarsBykulturId {
                id
                datum
                kasten
                beet
                nr
              }
              zaehlungsBykulturId {
                id
                datum
              }
            }
            nach_ausgepflanzt
          }
        }
      }
      lieferung {
        id
        personBypersonId {
          id
          name
        }
        lieferungTypWerteBytyp {
          id
          wert
        }
        lieferungStatusWerteBystatus {
          id
          wert
        }
        von_datum
        kulturBynachKulturId {
          id
          gartenBygartenId {
            id
            personBypersonId {
              id
              name
            }
          }
          kulturEventsBykulturId {
            id
            datum
            event
          }
          kulturInventarsBykulturId {
            id
            datum
            kasten
            beet
            nr
          }
          zaehlungsBykulturId {
            id
            datum
          }
        }
        nach_ausgepflanzt
      }
      person {
        id
        name
        gartensBypersonId {
          id
        }
        sammlungsBypersonId {
          id
          artByartId {
            id
            art_ae_art {
              id
              name
            }
          }
          herkunftByherkunftId {
            id
            nr
          }
        }
        lieferungsBypersonId {
          id
          personBypersonId {
            id
            name
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          von_datum
          kulturBynachKulturId {
            id
            artByartId {
              id
              art_ae_art {
                id
                name
              }
            }
            gartenBygartenId {
              id
              personBypersonId {
                id
                name
              }
            }
          }
          nach_ausgepflanzt
        }
      }
      masseinheit_werte {
        id
        wert
        sort
      }
      zaehleinheit_werte {
        id
        wert
        sort
      }
      lieferung_zwischenlager_werte {
        id
        wert
        sort
      }
      lieferung_status_werte {
        id
        wert
        sort
      }
      lieferung_typ_werte {
        id
        wert
        sort
      }
    }
  }
`
