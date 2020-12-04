create function leaves_of_art(art_id uuid) returns setof art_rev as $$
  select
      *
    from
      art_rev
    where
      -- leaves
      not exists (
        select
          art_id
        from
          art_rev as node
        where
          node.art_id = $1
          and node._parent_rev = art_rev._rev
      )
      -- on undeleted
      and _deleted = false
      -- of this record
      and art_id = $1;
$$ LANGUAGE sql;

select * from leaves_of_art('f65dd840-f6aa-11ea-868c-25e28837c601')

create function leaves_of_herkunft(herkunft_id uuid) returns setof herkunft_rev as $$
  select
      *
    from
      herkunft_rev
    where
      -- leaves
      not exists (
        select
          herkunft_id
        from
          herkunft_rev as node
        where
          node.herkunft_id = $1
          and node._parent_rev = herkunft_rev._rev
      )
      -- on undeleted
      and _deleted = false
      -- of this record
      and herkunft_id = $1;
$$ LANGUAGE sql;

select * from leaves_of_herkunft('473fd620-022a-11eb-861e-4394d988348b')

create function max_rev_depth(herkunft_id uuid) returns int as $$
  select
    max(_depth)
  from
    leaves_of_herkunft($1);
$$ LANGUAGE sql;

select * from max_rev_depth('473fd620-022a-11eb-861e-4394d988348b')