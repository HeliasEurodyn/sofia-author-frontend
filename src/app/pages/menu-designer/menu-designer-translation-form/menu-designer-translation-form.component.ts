import {Component, OnInit} from '@angular/core';
import {MenuDTO, MenuFieldDTO} from '../../../dtos/menu/menuDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../../services/crud/menu.service';
import {Location} from '@angular/common';
import {CommandNavigatorService} from '../../../services/system/command-navigator.service';
import {RoleService} from '../../../services/crud/role.service';
import {PageComponent} from '../../page/page-component';
import {LanguageDTO} from '../../../dtos/language/language-dto';
import {LanguageService} from '../../../services/crud/language.service';
import {MenuTranslationDTO} from '../../../dtos/menu/menu-translation-dto';

@Component({
  selector: 'app-menu-designer-translation-form',
  templateUrl: './menu-designer-translation-form.component.html',
  styleUrls: ['./menu-designer-translation-form.component.css']
})
export class MenuDesignerTranslationFormComponent extends PageComponent implements OnInit {


  public menuDTO: MenuDTO;

  public menuFieldComponent: MenuFieldDTO;
  public selectedParentMenuFieldComponent: MenuFieldDTO;

  public languages: LanguageDTO[];

  public tableExists = false;
  public fieldListMode = 'insert';
  public mode: string;

  public visibleSection = 'empty';
  public isCollapsed = false;

  language: LanguageDTO;

  constructor(private activatedRoute: ActivatedRoute,
              private menuDesignerService: MenuService,
              private router: Router,
              private location: Location,
              private navigatorService: CommandNavigatorService,
              private languageService: LanguageService,
              private roleService: RoleService) {
    super();
  }

  ngOnInit(): void {
    this.initNav(this.activatedRoute);

    let id = '0';
    this.mode = 'new-record';
    this.menuDTO = new MenuDTO();
    this.menuFieldComponent = new MenuFieldDTO;

    const locateParams = this.getLocateParams();
    if (locateParams.has('ID')) {
      id = locateParams.get('ID');
      this.mode = 'edit-record';
    }

    if (this.mode === 'edit-record') {
      this.menuDesignerService.getById(id).subscribe(data => {
        this.menuDTO = data;
      });
    }
    this.refreshComponents();
  }

  refreshComponents() {
    this.languageService.get().subscribe(data => {
      this.languages = data;
    });
  }

  addLanguage(language: LanguageDTO) {

    if (this.menuDTO.translations == null) {
      this.menuDTO.translations = [];
    }

    for (const translation of this.menuDTO.translations) {
      if (translation.language.id === language.id) {
        return;
      }
    }

    const menuTranslationDTO = new MenuTranslationDTO();
    menuTranslationDTO.language = language;
    menuTranslationDTO.name = this.menuDTO.name;

    this.menuDTO.translations.push(menuTranslationDTO);

    this.addLanguageToTree(language, this.menuDTO.menuFieldList);
  }

  addLanguageToTree(language: LanguageDTO, menuFieldList: MenuFieldDTO[]) {
    menuFieldList
      .forEach(menuField => {
        if (menuField.translations == null) {
          menuField.translations = [];
        }

        const menuTranslationDTO = new MenuTranslationDTO();
        menuTranslationDTO.language = language;
        menuTranslationDTO.name = menuField.name;
        menuField.translations.push(menuTranslationDTO);

        this.addLanguageToTree(language, menuField.menuFieldList);
      });
  }

  save() {
    this.menuDesignerService.update(this.menuDTO).subscribe(data => {
      this.location.back();
    });
  }

  hasChildren(item: MenuFieldDTO) {
    if (item.menuFieldList == null) {
      return false;
    }

    if (item.menuFieldList.length === 0) {
      return false;
    }

    return true;
  }

  hideChildren(item: MenuFieldDTO) {
    item.expanded = false;
  }

  showChildren(item: MenuFieldDTO) {
    item.expanded = true;
  }

  setVisibleSection(visibleSection: string) {
    this.visibleSection = visibleSection;
  }

  selectLanguage(language: LanguageDTO) {
    this.language = language;
    this.visibleSection = 'general';
  }

  removeTranslation(language: LanguageDTO) {
    this.menuDTO.translations = this.menuDTO.translations.filter(item => item.language.id !== language.id);

    this.removeTranslationFromTree(language, this.menuDTO.menuFieldList);
  }

  removeTranslationFromTree(language: LanguageDTO, menuFieldList: MenuFieldDTO[]) {
    menuFieldList
      .forEach(menuField => {
        if (menuField.translations == null) {
          menuField.translations = [];
        }

        menuField.translations =
          menuField.translations.filter(item => item.language.id !== language.id);

        this.removeTranslationFromTree(language, menuField.menuFieldList);
      });
  }


}
