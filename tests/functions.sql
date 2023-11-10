CREATE OR REPLACE FUNCTION get_variable_id(var_name character varying) RETURNS integer AS $$
DECLARE
  var_id integer;
BEGIN
  SELECT id INTO var_id FROM tbl_players_variables WHERE name = var_name;
  RETURN var_id;
END;
$$ LANGUAGE plpgsql;
