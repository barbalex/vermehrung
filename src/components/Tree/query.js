import gql from 'graphql-tag'

export default gql`
  query TreeQuery {
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
        kultursBygartenId {
          id
          artByartId {
            id
            art_ae_art {
              id
              name
            }
          }
        }
      }
      sammlungsBypersonId {
        id
        datum
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
`
